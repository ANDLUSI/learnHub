package com.csi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class Student {

    private Integer studentId;

    private String studentName;

    private String studentPassword;

    private String studentSex;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date studentBorndate;

    private String studentPhone;

    private String studentEmail;

    private String studentHeadphone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date studentCreatedate;

    private Integer studentStatus;

    private String studentLike;

}
