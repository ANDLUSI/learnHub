package com.csi.service;

import com.csi.domain.Order;
import com.csi.domain.StudentCourse;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StudentCourseService {
    List<StudentCourse> findAllByStuId(Integer studentId,  Integer courseStatus);
    Double selectCourseProcess(Integer studentId,Integer courseId);

    Integer updateCourseProcess( Integer studentId, Integer courseId);

    double selectAllProcess(Integer studentId, Integer courseId);

    int dropCourse(Integer studentId, Integer courseId);

    int bindStudentCourse(Order order);

    int findIsDrop ( Integer studentId, Integer courseId);

    int modifyIsDrop  ( Integer studentId, Integer courseId);

}
