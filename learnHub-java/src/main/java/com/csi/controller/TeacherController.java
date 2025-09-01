package com.csi.controller;


import com.csi.domain.*;
import com.csi.service.TeacherService;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@CrossOrigin
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Resource
    private ServletContext servletContext;

    //教师开启直播
    @PostMapping("/startLive")
    public Result startLive(@RequestBody TransObj obj) {
        Course course = new Course();
        course.setId(obj.getCourse().getId());
        course.setTeacherId(obj.getCourse().getTeacherId());

        Live live = new Live();
        live.setTitle(obj.getLive().getTitle());
        live.setDescription(obj.getLive().getDescription());
        live.setCourseId(obj.getCourse().getId());
        live.setTeacherId(obj.getLive().getTeacherId());
        live.setLiveUrl(obj.getLive().getLiveUrl());
        live.setSecretKey(obj.getLive().getSecretKey());

        Integer liveId = teacherService.startLive(course, live);

        Result<Integer> result = new Result<>(1001, "请尽快完成推流！",liveId);
        return result;

    }


    //教师结束直播
    @PostMapping("/stopLive")
    public Result stopLive(@RequestBody TransObj obj) {

        System.out.println("关闭直播"+obj.getCourse().getId());
        System.out.println("关闭直播"+obj.getCourse().getTeacherId());

        Course  course = new Course();
        course.setId(obj.getCourse().getId());
        course.setTeacherId(obj.getCourse().getTeacherId());

        //调用stop方法
        teacherService.stopLive(course,obj.getLive().getId());

        Result<Integer> result = new Result<>("已结束直播！", 1001);
        return result;
    }


    //查询教师直播状态
    @PostMapping("/findTeaIsLive")
    public Result findTeaIsLive(@RequestParam("teacherId") Integer teacherId){

        Live teaIsLive = teacherService.findTeaIsLive(teacherId);

        Result result = new Result<>(1001, "查询成功",teaIsLive);

        return result;

    }
    //查询老师正在教学的课
    @PostMapping("/findCourseByTeaId")
    public Result findCourseByTeaId(@RequestParam("id") String id) {

        List<Course> courseByTeaId = teacherService.findCourseByTeaId(id);

        Result result =new Result<>("成功",1001);
        result.setData(courseByTeaId);

        return result;
    }

    //视频进度存到redis中
    @RequestMapping("/updateTimer")
    public Result videoTimer(@RequestParam("userId") String teacherId, @RequestParam("lessonId") Integer lessonId,
                             @RequestParam("videoTimer") Double videoTimer){

        System.out.println("======" + videoTimer + "=======");
        Object timer = teacherService.teacherVideoTimer(teacherId, lessonId, videoTimer);

        Result videoTimerResult = null;
        if (Double.parseDouble(timer.toString()) == videoTimer){
            videoTimerResult = new Result(1001, "保存成功", timer);
        }else {
            videoTimerResult = new Result("保存失败",1002 );
        }
        return videoTimerResult;
    }


    //查询视频进度
    @RequestMapping("/readTimer")
    public Result readTimer(@RequestParam("userId") String teacherId, @RequestParam("lessonId") Integer lessonId){
        Object readTimer = teacherService.teacherReadTimer(teacherId, lessonId);
        Result readTimerResult = null;
        //是否有记录
        if (readTimer != null){
            readTimerResult = new Result(1001, "视频有记录", readTimer);
        }else {
            readTimerResult = new Result("视频无记录", 1002);
        }
        return readTimerResult;
    }


    //查询教师所有订单
    @GetMapping("/selTeacherOrder")
    public com.csi.utils.Result selTeacherOrder(@RequestParam("teacherId") Integer teacherId ){

        List<OrderInfoDTO> orderInfoDTOS = teacherService.selTeacherOrder( teacherId);
        com.csi.utils.Result.ok(orderInfoDTOS);
        return com.csi.utils.Result.ok(orderInfoDTOS);
    }

    /*新增1205*/
    //查询老师教的课
    @GetMapping("/findCourseByTeacherId")
    public List<Course> findCourseByTeacherId(@RequestParam("teacherId") Integer teacherId){
        List<Course> courseByTeacherId = teacherService.findCourseByTeacherId(teacherId);
        return courseByTeacherId;
    }


    //通过id查询老师信息
    @RequestMapping("/findTeacherById")
    public Object findTeacherById(@RequestParam("teacherId") Integer teacherId){
        System.out.println("老师id："+teacherId);
        Teacher teacher = teacherService.selInformation(teacherId);
        Result result = null;
        if (teacher!=null){
            result = new Result<>("操作成功",2001);
            result.setData(teacher);
            return result;
        }
        result = new Result<>("操作失败",4001);
        return result;
    }

}
