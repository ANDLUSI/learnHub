package com.csi.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

//课程表
@Data
public class Course {

    //课程id
    private Integer id;

    //课程名称
    private String courseName;

    //课程介绍
    private String courseDescription;

    //课程时间
    private String coursePrice;

    //创建价格
    private Date courseCreatedate;

    //课程状态，是否需要审核，1已经审核，0待审核
    private Integer courseStatus;

    //教师id
    private Integer teacherId;
    private String  teacherName;
    //当前课程是否在直播
    private Integer liveStatus;

    //课程的封面
    private String coverPic;

    //课程的分类id
    private Integer categoryId;

    //适用人群
    private String applicationPeople;

    //课程特色
    private String courseFeature;

    //教师主讲方向
    private String teacherLecture;

    //课程详情图片
    private String contentImage;

    //分类
    private Category category;
}
