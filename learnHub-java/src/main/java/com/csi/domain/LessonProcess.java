package com.csi.domain;

import lombok.Data;

//课时进度表
@Data
public class LessonProcess {

    private Integer id;

    private Integer studentId;

    private Integer courseId;

    private Integer lessonId;

    //观看进度
    private Double watchedProcess;

    //最新观看时间
    private Double lastUpdateTime;

    private Integer chapterId;
    //课时对象
    private Lesson lesson;


}
