package com.csi.domain;

import lombok.Data;

import java.util.Map;

@Data
public class TransObj {


    private Category category;

    private Chapter chapter;

    private Course course;

    private Lesson lesson;

    private LessonProcess lessonProcess;

    private Live live;

    private Order order;

    private Slideshow slideshow;

    private Student student;

    private StudentCourse studentCourse;

    private Teacher teacher;

    private Map<Object,Object> map;

}
