package com.csi.mapper;

import com.csi.domain.Course;
import com.csi.domain.Live;
import com.csi.domain.OrderInfoDTO;
import com.csi.domain.Teacher;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TeacherMapper {

    //教师开启直播，修改课程表中的直播状态
    void modifyCourseLiveStatus(Course course);

    //开启直播，为直播表中添加数据
    Integer saveLive(Live live);


    //根据课程中教师id查询教师信息
    com.csi.domain.Teacher findTeacherById(Integer id);

    void modifyLiveLiveStatus(Integer id);

    //查看老师当前是否在直播
    Live findTeaIsLive(Integer teacherId);

    //查询所有教师
    List<Teacher> selTeacher(@Param("search")String search);

    //查询教师都有哪些授课
    List<Course> findCourseByTeacherId(Integer teacherId);

    //查询教师订单
    List<OrderInfoDTO> selTeacherOrder(Integer id);

    //查询教师详细信息
    Teacher selInformation(Integer TeacherId);

    //更新教师课程数量
    void modCourseCount(Integer teacherId);

    //修改教师信息
    int modTeacherInfo(Teacher teacher);
}
