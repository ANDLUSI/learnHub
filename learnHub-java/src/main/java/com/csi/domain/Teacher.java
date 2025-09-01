package com.csi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Data
public class Teacher {

    private Integer teacherId;

    private String teacherName;

    private String teacherPassword;

    private String teacherSex;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date teacherBorndate;

    private String teacherPhone;

    private String teacherEmail;

    private String teacherHeadphone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date teacherCreatedate;

    private Integer teacherStatus;

    private String teacherDescription;

    private String teacherCount;

    //教师真实姓名
    private String realName;

    //直播密钥，用于区分每位教师的直播间
    private String secretKey;
}
