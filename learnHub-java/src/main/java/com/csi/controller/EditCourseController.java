package com.csi.controller;

import com.csi.domain.Chapter;
import com.csi.domain.Course;
import com.csi.domain.Lesson;
import com.csi.domain.Result;
import com.csi.service.ChapterService;
import com.csi.service.CourseService;
import com.csi.service.LessonService;
import com.csi.utils.OSSUtil;
import com.csi.vo.EditCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/edit")
public class EditCourseController {

    @Autowired
    private ChapterService chapterService;
    @Autowired
    private LessonService lessonService;
    @Autowired
    private CourseService courseService;


    //新增课程
    @RequestMapping("/addCourse")
    public Result addCourse(Course course,@RequestParam(value = "photo",required = false) MultipartFile photo) throws IOException {

        System.out.println("course = " + course + ", photo = " + photo);


        if (photo!=null){
            //上传图片到阿里云
            String path = OSSUtil.upload(photo.getOriginalFilename(), photo.getInputStream());
            course.setCoverPic(path);
        }

        int ret = courseService.addCourse(course);
        Result insChapterResult = null;
        if (ret == 1){
            insChapterResult = new Result("操作成功",2001);
        }else {
            insChapterResult = new Result<>("操作失败",4001);
        }
        return insChapterResult;
    }


    //通过课程id查询某门课程底下的全部章节和课时（只有名字和id）
    @RequestMapping("findByCourseId")
    public Result findByCourseId(@RequestParam("courseId") Integer courseId ){
        System.out.println("课程底下所有章节："+courseId);
        EditCourse editCourse = courseService.getCourseStr(courseId);
        Result result = null;
        if (editCourse!=null){
            result = new Result<>("操作成功",2001);
            result.setData(editCourse);
            return result;
        }
        result = new Result<>("操作失败",4001);
        return result;
    }


    //新增章节
    @RequestMapping("/insertChapter")
    public Result insertChapter(@RequestBody Chapter chapter){
        System.out.println("=====>>>"+chapter);
        chapter.setCreatdate(new Date());
        int ret = chapterService.insertChapter(chapter);
        Result insChapterResult = null;
        if (ret == 1){
            insChapterResult = new Result("操作成功",2001);
        }else {
            insChapterResult = new Result<>("操作失败",4001);
        }
        return insChapterResult;
    }

    //删除章节
    @RequestMapping("/delChapter")
    public Result delChapter(@RequestParam("id") Integer id){

        int ret = chapterService.del(id);
        Result insChapterResult = null;
        if (ret == 1){
            insChapterResult = new Result("操作成功",2001);
        }else {
            insChapterResult = new Result<>("操作失败",4001);
        }
        return insChapterResult;
    }



    //新增课时
    @RequestMapping("/addLesson")
    public Result addLesson(Lesson lesson,@RequestParam(value = "file",required = false) MultipartFile file) throws IOException {
        System.out.println("===lesson:"+lesson);
        System.out.println("===file:"+file);
        if (file!=null){
            //上传图片到阿里云
            String path = OSSUtil.upload(file.getOriginalFilename(), file.getInputStream());
            lesson.setVideoUrl(path);
        }

        int ret = lessonService.insertLesson(lesson);
        Result insChapterResult = null;
        if (ret == 1){
            insChapterResult = new Result("操作成功",2001);
        }else {
            insChapterResult = new Result<>("操作失败",4001);
        }
        return insChapterResult;
    }

    //删除课时
    @RequestMapping("/delLesson")
    public Result delLesson(@RequestParam("id") Integer id){

        int ret = lessonService.del(id);
        Result insChapterResult = null;
        if (ret == 1){
            insChapterResult = new Result("操作成功",2001);
        }else {
            insChapterResult = new Result<>("操作失败",4001);
        }
        return insChapterResult;
    }

}
