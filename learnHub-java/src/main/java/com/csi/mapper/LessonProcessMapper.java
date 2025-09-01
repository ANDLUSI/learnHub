package com.csi.mapper;


import com.csi.domain.LessonProcess;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LessonProcessMapper {

    //查询章节下所以课时及视频观看进度
    List<LessonProcess> findAllLessonProcess(@Param("courseId") Integer courseId,@Param("chapterId") Integer chapterId);

    //更新视频进度   学生id  课时id  观看进度
    int updateProcess(LessonProcess  lessonProcess);

    //将课时信息新增到表里
    int insertLessonProcess(LessonProcess lessonProcess);

    //查询表里是否有数据
    LessonProcess selectLessonProcess(@Param("studentId")Integer studentId, @Param("lessonId") Integer lessonId);

    Double readVideoProcess(@Param("studentId") Integer studentId, @Param("lessonId") Integer lessonId);

    Double readLastUpdateTime(@Param("studentId") Integer studentId, @Param("lessonId") Integer lessonId);

    int deleteLessonProcess(@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);
}
