package com.csi.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EditChapter {

    private Integer id;

    private String chapterName;

    //章节顺序
    private String orderIndex;

    List<EditLesson> lessonList;
}
