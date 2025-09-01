package com.csi.domain;

import lombok.Data;

import java.util.Date;

//课时表
@Data
public class Lesson {

    private Integer id;

    private Integer chapterId;

    private String lessonName;

    //课时视频的存放地址
    private String videoUrl;

    //视频的时长
    private float duration;

    private Integer courseId;

    //课时顺序
    private int orderIndex;

    private Date creatdate;


}
