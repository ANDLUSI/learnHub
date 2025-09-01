package com.csi.service.impl;

import com.csi.domain.Lesson;
import com.csi.mapper.LessonMapper;
import com.csi.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonMapper lessonMapper;


    //根据课程id查询课时
    @Override
    public List<Lesson> findLessonById(Integer id) {
        return lessonMapper.findLessonById(id);
    }

    //新增课时
    @Override
    public int insertLesson(Lesson lesson) {
        return lessonMapper.insertLesson(lesson);
    }

    //删除课时
    public int del(Integer id){
        return lessonMapper.del(id);
    }



    //查询课时信息
    @Override
    public Lesson findLessonInfo(Integer lessonId) {
        return lessonMapper.findLessonInfo(lessonId);
    }

    //更新视频总长度
    @Override
    public int videoTotalLength(Lesson lesson) {
        //查询课时信息
        Lesson lessonInfo = findLessonInfo(lesson.getId());
        //将课时的视频总长度存到lessonInfo中
        lessonInfo.setDuration(lesson.getDuration());
        //将lessonInfo作为参数传递
        return lessonMapper.videoTotalLength(lessonInfo);
    }

    //获取视频总长度
    @Override
    public double videoDuration(Integer lessonId) {
        return lessonMapper.videoDuration(lessonId);
    }

    @Override
    public Lesson selectLessonInfo(int orderIndex, Integer lessonId) {
        return lessonMapper.selectLessonInfo(orderIndex,lessonId);
    }

}
