package com.csi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@ToString
public class OrderInfoDTO {
    // 订单ID
    private String id;
    // 学生姓名
    private String studentName;
    // 教师姓名
    private String teacherName;
    // 课程名称
    private String courseName;
    // 课程价格
    private Double coursePrice;
    // 购买日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String courseBuyDate;
}
