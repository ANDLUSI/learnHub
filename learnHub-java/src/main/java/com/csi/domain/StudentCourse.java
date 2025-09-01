package com.csi.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 学生与其课程
 */
@Getter
@Setter
@ToString

public class StudentCourse {
    private Integer id;

    //学生这门课的学习进度
    private Double process;

    private Integer studentId;

    private String studentName;

    private Integer courseId;

    private String courseName;

    private Integer teacherId;

    private String teacherName;

    //课程封面
    private String coverPic;

    //课程状态
    private Integer courseStatus;

    //是否开启直播
    private Integer liveStatus;


}
