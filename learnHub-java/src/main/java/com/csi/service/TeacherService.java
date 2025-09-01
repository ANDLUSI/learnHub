package com.csi.service;

import com.csi.domain.Course;
import com.csi.domain.Live;
import com.csi.domain.OrderInfoDTO;
import com.csi.domain.Teacher;

import java.util.List;

public interface TeacherService {

        Integer startLive(Course course,Live live);

        void stopLive(Course course,Integer id);



        Live findTeaIsLive(Integer teacherId);


        List<Course> findCourseByTeaId(String teacherId);

        //查询老师教的所有课程
        List<Course> findCourseByTeacherId(Integer teacherId);
        //视频进度
        Object teacherVideoTimer(String teacherId, Integer lessonId, Double videoTimer);
        //查询视频进度
        Object teacherReadTimer(String teacherId, Integer lessonId);

        //查询所有教师订单
        List<OrderInfoDTO> selTeacherOrder(Integer id);

        //查询教师详细信息
        Teacher selInformation(Integer TeacherID);

}
