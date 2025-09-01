package com.csi.service.impl;

import com.csi.domain.Order;
import com.csi.domain.StudentCourse;

import com.csi.mapper.LessonProcessMapper;
import com.csi.mapper.OrderMapper;
import com.csi.mapper.StudentCourseMapper;
import com.csi.service.StudentCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StudentCourseServiceImpl implements StudentCourseService {

    @Autowired
    private StudentCourseMapper studentCourseMapper;
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private LessonProcessMapper lessonProcessMapper;


    @Override
    public List<StudentCourse> findAllByStuId(Integer studentId, Integer courseStatus) {
        return studentCourseMapper.findAllByStuId(studentId,courseStatus);
    }

    //查询课程进度
    @Override
    public Double selectCourseProcess(Integer studentId, Integer courseId) {
        //查询之前先更新同步一下进度
        updateCourseProcess(studentId,courseId);
        Double process = studentCourseMapper.selectCourseProcess(studentId, courseId);
        process= Math.round(process * 100.0) / 100.0;
        return process;
    }

    /**
     * 更新课程进度
     * @param studentId
     * @param courseId
     * @return
     */
    @Override
    public Integer updateCourseProcess(Integer studentId, Integer courseId) {
        //获取最新总进度
        double newProcess = selectAllProcess(studentId, courseId);
        //获取旧总进度
        Double oldProcess = studentCourseMapper.selectCourseProcess(studentId, courseId);
        int i=0;
        if (newProcess>oldProcess){
            i= studentCourseMapper.updateCourseProcess(studentId,courseId,newProcess);
            System.out.println("成功更新课程进度！");
        }
        return i;
    }


    /**
     * 获取最新课程学习进度
     * @param studentId
     * @param courseId
     * @return
     */
    @Override
    public double selectAllProcess(Integer studentId, Integer courseId) {
        return studentCourseMapper.selectAllProcess(studentId, courseId);
    }

    /**
     * 退课
     * @param studentId
     * @param courseId
     * @return
     */
    @Override
    public int dropCourse(Integer studentId, Integer courseId) {
        //修改订单状态
        orderMapper.modifyOrderStatus(-1,studentId,courseId);
        //删除学生看课记录
        lessonProcessMapper.deleteLessonProcess(studentId,courseId);
        //删除学生与课程表关系
        return studentCourseMapper.dropCourse(studentId,courseId);
    }

    @Override
    public int bindStudentCourse(Order order) {
        return studentCourseMapper.bindStudentCourse(order);
    }

    @Override
    public int findIsDrop(Integer studentId, Integer courseId) {
        return studentCourseMapper.findIsDrop(studentId,courseId);
    }

    @Override
    public int modifyIsDrop(Integer studentId, Integer courseId) {
        return studentCourseMapper.modifyIsDrop(studentId,courseId);
    }


}
