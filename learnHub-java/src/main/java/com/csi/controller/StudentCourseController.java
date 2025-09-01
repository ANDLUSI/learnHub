package com.csi.controller;

import com.csi.domain.Result;
import com.csi.domain.StudentCourse;
import com.csi.service.CourseService;
import com.csi.service.OrderService;
import com.csi.service.StudentCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studentCourse")
@CrossOrigin
public class StudentCourseController {

    @Autowired
    private StudentCourseService studentCourseService;

    @Autowired
    private OrderService orderService;


    /**
     * 通过学生id查询不同状态课程
     * @param studentId
     * @param courseStatus
     * @return
     */
    @GetMapping("/findAllByStuId")
    public  Object findAllByStuId(@RequestParam("studentId") Integer studentId,@RequestParam(value = "courseStatus",required = false) Integer courseStatus){

        System.out.println(courseStatus);
        List<StudentCourse> studentCourses = studentCourseService.findAllByStuId(studentId, courseStatus);

        System.out.println(studentCourses.size());
        Result<List<StudentCourse>>  result =new Result<>();

        if (studentCourses!=null){
            result.setCode(2001);
            result.setMessage("查询成功！");
            result.setData(studentCourses);
        }
        return result;
    }

    /**
     * 更新视频进度
     * @param studentId
     * @param courseId
     * @return
     */
     @RequestMapping("/updateCourseProcess")
    public Result updateCourseProcess(@RequestParam("studentId")Integer studentId, @RequestParam("courseId") Integer courseId){
        Integer courseProcess = studentCourseService.updateCourseProcess(studentId, courseId);
        Result courseProcessResult = null;
        if (courseProcess == 1){
            courseProcessResult = new Result(1001, "课程进度新增成功", courseProcess);
        }else {
            courseProcessResult = new Result(1002, "课时进度新增失败",null);
        }
        return courseProcessResult;
    }

    /**
     * 查询课程进度
     * @param studentId
     * @param courseId
     * @return
     */
    @RequestMapping("/selectCourseProcess")
    public Double selectCourseProcess(@RequestParam("studentId")Integer studentId, @RequestParam("courseId") Integer courseId){
       Double process = studentCourseService.selectCourseProcess(studentId, courseId);
        process= Math.round(process * 100.0) / 100.0;
        return process;

    }


    /**
     * 退课
     * @param studentId
     * @param courseId
     * @return
     */
   @GetMapping("/dropCourse")
    public Object dropCourse(@RequestParam("studentId") Integer studentId,@RequestParam("courseId") Integer courseId){
       int res = studentCourseService.dropCourse(studentId,courseId);
       Result result =new Result();
       if (res==1){
           //查询课程价格
           double coursePrice = orderService.findOrderPrice(studentId,courseId);
           result.setCode(2001);
           result.setMessage("退课成功");
           result.setData(coursePrice);
       }else {
           result.setCode(4001);
           result.setMessage("操作失败");
       }
       return result;
    }


    /**
     * 查询是否可以退课
     * @param studentId
     * @param courseId
     * @return
     */
    @GetMapping("/findIsDrop")
    public Object findIsDrop(@RequestParam("studentId") Integer studentId,@RequestParam("courseId") Integer courseId){
        int isDrop = studentCourseService.findIsDrop(studentId, courseId);
        return isDrop;
    }


    /**
     * 修改是否可退课
     * @param studentId
     * @param courseId
     * @return
     */
    @GetMapping("/modifyIsDrop")
    public Object modifyIsDrop(@RequestParam("studentId") Integer studentId,@RequestParam("courseId") Integer courseId){
        int update= studentCourseService.modifyIsDrop(studentId, courseId);
        Result result =new Result();
        if (update==1){
            result.setMessage("修改成功");
            result.setCode(2001);

        }else {
            result.setMessage("操作成功");
            result.setCode(4001);
        }
        return result;
    }

}
