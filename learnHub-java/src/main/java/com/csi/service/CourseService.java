package com.csi.service;

import com.csi.domain.Order;
import com.csi.vo.EditCourse;

import com.csi.domain.Course;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface CourseService {

    Map<String, Object> findCourseById(Integer id);

    EditCourse getCourseStr(Integer courseId);
    //根据类型id查询课程信息
    List<Course> courseList(Integer categoryId);

    //查询所有课程
    List<Course> findCourseName(String courseName);

    //新增课程
    int addCourse(Course course);
    double   findCoursePrice(Integer courseId);

    int selectLiveStatus( Integer courseId) ;

    List<Course> selectRetiredCourse(Integer studentId);
    //根据用户选择的感兴趣标签选中多个分类名，根据多个分类id选中多个分类下的课程
    List<Course> getCategoryIdsByName(@Param("categoryName") String categoryName);





}
