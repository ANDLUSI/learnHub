package com.csi.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EditCourse {

    //课程id
    private Integer id;

    //课程名称
    private String courseName;

    //章节
    List<EditChapter> chapterList;
}
