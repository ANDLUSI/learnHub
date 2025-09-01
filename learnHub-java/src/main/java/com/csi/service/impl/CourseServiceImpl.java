package com.csi.service.impl;

import com.csi.domain.Course;
import com.csi.domain.Order;
import com.csi.domain.Teacher;
import com.csi.mapper.CourseMapper;
import com.csi.mapper.StudentMapper;
import com.csi.mapper.TeacherMapper;
import com.csi.service.CourseService;
import com.csi.vo.EditCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private StudentMapper studentMapper;

    @Override
    public Map<String, Object> findCourseById(Integer id) {
        //查询课程信息
        Course course = courseMapper.findCourseById(id);
        //返回集合
        Map<String, Object> mapResult = new HashMap<>();
        if (course != null){
            //根据课程信息中的教师id查询教师信息
            Teacher teacher = teacherMapper.findTeacherById(course.getTeacherId());
            //将课程和教师信息放入集合中
            mapResult.put("course", course);
            mapResult.put("teacher", teacher);
        }
        return mapResult;
    }

    @Override
    public EditCourse getCourseStr(Integer courseId) {
        return courseMapper.getCourseStr(courseId);
    }

    @Override
    public List<Course> courseList(Integer categoryId) {
        return courseMapper.courseList(categoryId);
    }

    //查询所有课程
    @Override
    public List<Course> findCourseName(String courseName) {
        return courseMapper.findCourseName(courseName);
    }

    @Override
    public int addCourse(Course course) {
        return courseMapper.add(course);
    }

    @Override
    public double findCoursePrice(Integer courseId) {
        return courseMapper.findCoursePrice(courseId);
    }

    @Override
    public int selectLiveStatus(Integer courseId) {
        return courseMapper.selectLiveStatus(courseId);
    }

    @Override
    public List<Course> selectRetiredCourse(Integer studentId) {
        return courseMapper.selectRetiredCourse(studentId);
    }

    @Override
    public List<Course> getCategoryIdsByName(String categoryName) {
        return  courseMapper.getCategoryIdsByName(categoryName);

    }


}
