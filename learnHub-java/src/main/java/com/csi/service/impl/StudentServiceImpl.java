package com.csi.service.impl;

import com.csi.domain.Result;
import com.csi.domain.Student;
import com.csi.domain.Teacher;
import com.csi.mapper.StudentMapper;
import com.csi.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public int update(Student student) {
        return studentMapper.update(student);
    }

    @Override
    public Student findById(Integer studentId) {
        return studentMapper.findById(studentId);
    }

    @Override
    public Student findByName(String studentName) {
        return studentMapper.findByName(studentName);
    }

    //密码登录
    @Override
    public Student loginStudent(String studentName, String studentPassword) {
        return studentMapper.loginStudent(studentName, studentPassword);
    }

    //密码登录(老师)
    @Override
    public Teacher loginTeacher(String teacherName, String teacherPassword) {
        return studentMapper.loginTeacher(teacherName, teacherPassword);
    }

    //通过手机号查询学生(用于验证码登录)
    @Override
    public Student findByPhone(String phone) {
        return studentMapper.findByPhone(phone);
    }

    //注册（学生）
    @Override
    public int save(Student student) {
        return studentMapper.save(student);
    }

    @Override
    public int saveLike(String likeString, Integer studentId) {
        return studentMapper.saveLike(likeString,studentId);
    }

}
