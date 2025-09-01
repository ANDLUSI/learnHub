package com.csi.domain;

import lombok.Data;

import java.util.Date;
import java.util.List;

//章节表
@Data
public class Chapter {

    private Integer id;

    private Integer courseId;

    private String chapterName;
    //章节顺序
    private String orderIndex;
    //章节创建时间
    private Date creatdate;
}
