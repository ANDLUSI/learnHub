package com.csi.service;

import com.csi.domain.Lesson;
import com.csi.domain.LessonProcess;
import org.apache.ibatis.annotations.Param;


import java.util.List;

public interface LessonProcessService {

    //查询章节下所以课时及视频观看进度
    List<LessonProcess> findAllLessonProcess(Integer courseId, Integer chapterId);

    int updateProcess(LessonProcess lessonProcess);

    //查询课时视频的进度
    Double readVideoProcess(Integer studentId, Integer lessonId);

    //视频总长度
    int videoTotalLength(Lesson lesson);


    //更新观看视频进度   学生id  课时id   课时视频总长度
    int updateProcess(Integer studentId, Integer lessonId, double viewDuration);

    int insertLessonProcess(LessonProcess lessonProcess);

    LessonProcess selectLessonProcess(Integer studentId, Integer lessonId);

    Double readLastUpdateTime(Integer studentId,Integer lessonId);
}
