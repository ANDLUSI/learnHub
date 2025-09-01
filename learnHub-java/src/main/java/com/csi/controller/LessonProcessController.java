package com.csi.controller;

import com.csi.domain.Lesson;
import com.csi.domain.LessonProcess;
import com.csi.domain.Result;
import com.csi.service.LessonProcessService;
import com.csi.service.LessonService;
import com.csi.service.StudentCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessonProcess")
public class LessonProcessController {

    @Autowired
    private LessonProcessService lessonProcessService;

    @Autowired
    private StudentCourseService studentCourseService;

    @Autowired
    private LessonService lessonService;


    /**
     * 根据学生id和章节id查询出该学生在某课程章节下的课时信息
     * @param courseId
     * @param chapterId
     * @return
     */
    @GetMapping("/findAllLessonProcess")
    public Object findAllLessonProcess(@RequestParam("courseId") Integer courseId, @RequestParam("chapterId") Integer chapterId) {

        System.out.println(courseId+"===="+chapterId);
        List<LessonProcess> list = lessonProcessService.findAllLessonProcess(courseId, chapterId);

        Result<List<LessonProcess>> result = new Result<>();
        if (list != null) {
            result.setCode(2001);
            result.setMessage("查询成功！");
                result.setData(list);
        } else {
            result.setCode(4001);
            result.setMessage("查询失败！");
        }
        System.out.println(result);
        return result;
    }



    /**
     * 更新/新增课时视频观看百分比

     * @return
     */
    @PostMapping("/updateVideoProcess")
    public boolean updateVideoProcess(@RequestBody LessonProcess lessonProcess){
        System.out.println("==========================" +lessonProcess);
        int ret = lessonProcessService.updateProcess(lessonProcess);
        if (ret == 1){
            return true;
        }else {
           return false;
        }
    }


    /**
     * 查询视频当前最新断点时间
     * @param studentId
     * @param lessonId
     * @return
     */
    @RequestMapping("/lastUpdateTime")
    public Result readVideoProcess(@RequestParam("studentId") Integer studentId, @RequestParam("lessonId") Integer lessonId){
        System.out.println("********************************************studentId = " + studentId + ", lessonId = " + lessonId);
        //视频百分比
        Double lastUpdateTime = lessonProcessService.readLastUpdateTime(studentId, lessonId);
        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%" + lastUpdateTime);
        Result videoProcessResult = null;
        if (lastUpdateTime != null){
            videoProcessResult = new Result<>(2001, "视频进度查询成功", lastUpdateTime);
        }else {
            videoProcessResult = new Result(4001, "视频进度查询失败",0);
        }
        return videoProcessResult;
    }


    @GetMapping("/selectLessonInfo")
    public Object selectLessonInfo(@RequestParam("orderIndex") Integer orderIndex,@RequestParam("lessonId") Integer lessonId ){
        Result<Lesson> result =new Result<>();
        Lesson lesson = lessonService.selectLessonInfo(orderIndex+1, lessonId);
        if (lesson!=null){
            result.setMessage("查询成功！");
            result.setCode(2001);
            result.setData(lesson);
        }else {
            result.setMessage("查询失败");
            result.setCode(4001);
        }
        return  result;
    }

    /**
     * 往lesson_process中新增数据
     * @param lessonProcess
     * @return
     */
    @RequestMapping("/insertLessonPro")
    public boolean insertLessonPro(@RequestBody LessonProcess lessonProcess){
        System.out.println("lessonProcess = " + lessonProcess);
        int ret = lessonProcessService.insertLessonProcess(lessonProcess);
        if (ret == 1){
          return true;
        }else {
           return false;
        }

    }
}
