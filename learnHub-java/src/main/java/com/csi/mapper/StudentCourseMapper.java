package com.csi.mapper;

import com.csi.domain.Order;
import com.csi.domain.StudentCourse;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StudentCourseMapper {

   //查询学生课程以及课程状态
    List<StudentCourse>  findAllByStuId(@Param("studentId") Integer studentId, @Param("courseStatus") Integer courseStatus);


    Double selectCourseProcess(@Param("studentId") Integer studentId, @Param("courseId") Integer courseId);

    int updateCourseProcess(@Param("studentId") Integer studentId, @Param("courseId") Integer courseId, @Param("process") double process);

    double selectAllProcess(@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);

    int dropCourse(@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);

   int bindStudentCourse(Order order);
    int findIsDrop (@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);

    int modifyIsDrop (@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);
}
