package com.csi.service;

import com.csi.domain.Result;
import com.csi.domain.Student;
import com.csi.domain.Teacher;
import org.apache.ibatis.annotations.Param;

public interface StudentService {
    //修改学生信息
    int update(Student student);

    //通过id查询学生信息
    Student findById(Integer studentId);

    Student findByName(String username);

    //账号密码登陆
    Student loginStudent(String studentName, String studentPassword);

    //密码登录（老师）
    Teacher loginTeacher(String teacherName , String teacherPassword);

    //通过手机号查询学生(用于验证码登录)
    Student findByPhone(String phone);

    //注册（学生）
    int save(Student student);

    int saveLike(String likeString, Integer studentId);
}
