package com.csi.service.impl;

import com.csi.domain.Lesson;
import com.csi.domain.LessonProcess;
import com.csi.mapper.LessonMapper;
import com.csi.mapper.LessonProcessMapper;
import com.csi.service.LessonProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LessonProcessServiceImpl implements LessonProcessService {
    @Autowired
    private LessonProcessMapper lessonProcessMapper;
    @Autowired
    private LessonMapper lessonMapper;

    @Override
    public List<LessonProcess> findAllLessonProcess(Integer courseId, Integer chapterId) {
        return lessonProcessMapper.findAllLessonProcess(courseId,chapterId);
    }


    /**
     * 更新视频观看进度，记录最新观看断点，进行新增观看记录
     * @param lessonProcess
     * @return
     */
    @Override
    public int updateProcess(LessonProcess lessonProcess) {
        //获取视频的总长度
        double videoTotalDuration = lessonMapper.videoDuration(lessonProcess.getLessonId());
        //计算视频观看百分比
        double newVideoProgress = lessonProcess.getLastUpdateTime() / (videoTotalDuration*60);
        //保留两位小数
        double newWatchProgress = Math.round(newVideoProgress * 100.0) / 100.0;
        lessonProcess.setWatchedProcess(newWatchProgress);//添加视频观看进度
        //是否有该条记录
        LessonProcess lessonProcess1 = lessonProcessMapper.selectLessonProcess(lessonProcess.getStudentId(),lessonProcess.getLessonId());
        if (lessonProcess1==null){
            //进行新增
            //获取课时对应的章节ID和课程ID
            Lesson lesson = lessonMapper.selectLessonAndCourse(lessonProcess.getLessonId());
            //封装
            lessonProcess.setChapterId(lesson.getChapterId());
            lessonProcess.setCourseId(lesson.getCourseId());
            int i = lessonProcessMapper.insertLessonProcess(lessonProcess);
            return i;
        }

        //如果已有该条记录
        //获取原来的百分比
        Double oldWatchProcess = readVideoProcess(lessonProcess.getStudentId(), lessonProcess.getLessonId());
        System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" + newWatchProgress + "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + oldWatchProcess);

        //原始百分比为0
        if (oldWatchProcess<=newWatchProgress) {
            //将视频百分比存到到数据库中
            return lessonProcessMapper.updateProcess(lessonProcess);
        }else {
            //依旧保留之前视频观看进度
            lessonProcess.setWatchedProcess(oldWatchProcess);
            return lessonProcessMapper.updateProcess(lessonProcess);
        }

    }


    //查询课时视频的进度, 百分比
    @Override
    public Double readVideoProcess(Integer studentId, Integer lessonId) {
        Double watchedProcess = lessonProcessMapper.readVideoProcess(studentId, lessonId);
        if (watchedProcess != null){
            return Double.parseDouble(String.format("%.2f",watchedProcess ));
        }
        return  0.0;
    }


//    //查询课程是否已经看完过
//    public Integer isComplete(Integer studentId, Integer lessonId){
//        LessonProcess lessonProcess = lessonProcessMapper.readVideoProcess(studentId, lessonId);
//        return lessonProcess.getIsFinished();
//    }

    @Override
    public int videoTotalLength(Lesson lesson) {
        return 0;
    }

    @Override
    public int updateProcess(Integer studentId, Integer lessonId, double viewDuration) {
        return 0;
    }


    /**
     * 新增课时观看记录
     * @param lessonProcess
     * @return
     */
    @Override
    public int insertLessonProcess(LessonProcess lessonProcess) {
        LessonProcess selectedLessonProcess = selectLessonProcess(lessonProcess.getStudentId(), lessonProcess.getLessonId());
        if (selectedLessonProcess != null){
            return 0;
        }
        return lessonProcessMapper.insertLessonProcess(lessonProcess);
    }

    /**
     * 查询表里是否已有记录
     * @param studentId
     * @param lessonId
     * @return
     */
     @Override
    public LessonProcess selectLessonProcess(Integer studentId, Integer lessonId) {
        return lessonProcessMapper.selectLessonProcess(studentId, lessonId);
    }

    @Override
    public Double readLastUpdateTime(Integer studentId, Integer lessonId) {
        return lessonProcessMapper.readLastUpdateTime(studentId,lessonId);
    }
}
