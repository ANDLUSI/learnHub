package com.csi.mapper;

import com.csi.domain.Student;
import com.csi.domain.Teacher;
import org.apache.ibatis.annotations.Param;

public interface StudentMapper {

    //修改学生信息
    int update(Student student);

    //通过id查询学生信息

    Student findById(@Param("studentId") Integer studentId);

    Student findByName(@Param("studentName")String studentName);

    //密码登录
    Student loginStudent(@Param("studentName")String studentName,
                         @Param("studentPassword") String studentPassword);
    //密码登录（老师）
    Teacher loginTeacher(@Param("teacherName")String teacherName,
                         @Param("teacherPassword") String teacherPassword);
    //通过手机号查找学生
    Student findByPhone(String phone);

    //注册（学生）
    int save(Student student);

    //插入学生喜欢的类型
    int saveLike(@Param("likeString") String likeString,
                 @Param("studentId") Integer studentId);


}
