package com.csi.service;

import com.csi.domain.Lesson;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LessonService {

    List<Lesson> findLessonById(Integer id);

    int insertLesson(Lesson lesson);

    int del(Integer id);


    Lesson findLessonInfo(Integer lessonId);

    int videoTotalLength(Lesson lesson);

    double videoDuration(Integer lessonId);

    Lesson selectLessonInfo(int orderIndex,  Integer lessonId);
}
