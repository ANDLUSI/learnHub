package com.csi.mapper;

import com.csi.domain.Lesson;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LessonMapper {

    //根据课程id查询课时
    List<Lesson> findLessonById(Integer courseId);

    //新增课时
    int insertLesson(Lesson lesson);
    //删除课时
    int del(Integer id);

    //查询课时信息
    Lesson findLessonInfo(Integer lessonId);

    //更新视频总长度
    int videoTotalLength(Lesson lesson);

    //查询视频总长
    double videoDuration(Integer lessonId);
    Lesson selectLessonAndCourse(@Param("lessonId") Integer lessonId);

    Lesson selectLessonInfo(@Param("orderIndex") int orderIndex,@Param("lessonId") Integer lessonId);



}
