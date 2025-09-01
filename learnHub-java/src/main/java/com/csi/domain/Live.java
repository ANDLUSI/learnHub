package com.csi.domain;

import lombok.Data;


@Data
public class Live {


    private Integer id;

    //直播标题
    private String title;

    //直播描述
    private String description;

    //课程id
    private Integer courseId;

    //课程
    private Course course;

    private Integer teacherId;

    //直播路径
    private String liveUrl;

    //直播密钥
    private String secretKey;

    private Double duration;

    //直播间的封面图片
    private String coverImg;

    private Integer liveStatus;


}
