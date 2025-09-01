package com.csi.domain;

import lombok.Data;

//订单表
@Data
public class Order {
    private Integer id;

    private Integer studentId;

    private Integer courseId;

    private String courseName;

    private Double coursePrice;

    private Integer teacherId;
    //课程购买日期
    private String courseBuyDate;

}
