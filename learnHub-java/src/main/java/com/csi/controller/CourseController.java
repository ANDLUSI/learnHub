package com.csi.controller;

import com.csi.domain.Course;
import com.csi.domain.Order;
import com.csi.domain.Result;
import com.csi.domain.Student;
import com.csi.mapper.StudentMapper;
import com.csi.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 查询课程信息(页面上课程信息和介绍板块),包含课程全部信息和教师部分信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/courseInfo", method = RequestMethod.GET)
    public Result<Map<String, Object>> findCourseById(@RequestParam("id") Integer id){

        Map<String, Object> mapResult = courseService.findCourseById(id);
        //返回结果集
        Result<Map<String, Object>> courseResult = null;

        if (mapResult != null){
            courseResult = new Result<>(1001, "课程信息查询成功", mapResult);

        }else {
            courseResult = new Result<>("课程信息查询失败", 1002);
        }
        return courseResult;
    }

    //根据类型id查询课程信息
    @RequestMapping("/courseList")
    public Result courseList(@RequestParam("categoryId") Integer categoryId){
        List<Course> courseList = courseService.courseList(categoryId);
        Result courseListResult = null;
        if (courseList != null && courseList.size() != 0){
            courseListResult = new Result(1001, "根据类型查询课程成功", courseList);
        }else {
            courseListResult = new Result("根据类型查询课程失败",1002);
        }
        return courseListResult;
    }

    @RequestMapping("/findCourseName")
    public Result findCourseName(@RequestParam(value = "courseName",required = false) String courseName) {
        System.out.println(courseName);
        //添加Redis功能：从redis中查询集合是否存在，存在则从redis中取出集合
        // 构建Redis键
        String redisKey = "course:name:" + courseName;
        // 尝试从Redis中获取课程列表
        List<Course> courseList = (List<Course>) redisTemplate.opsForValue().get(redisKey);

        if (courseList == null) {
            // 如果Redis中没有数据，从数据库查询
            courseList = courseService.findCourseName(courseName);

            if (courseList != null && !courseList.isEmpty()) {
                // 将查询结果存入Redis，并设置过期时间（例如1小时）
                redisTemplate.opsForValue().set(redisKey, courseList, 1, TimeUnit.HOURS);
            }
        }

        Result result = null;
        if(courseList != null && courseList.size() != 0) {
            result = new Result("查询成功" , 2001);
        } else {
            result = new Result("查询失败" , 4001);
        }
        result.setData(courseList);
        return result;
    }



    /**
     * 查询直播状态
     * @param courseId
     * @return
     */
    @GetMapping("/selectLiveStatus")
    public int selectLiveStatus(@RequestParam("courseId") Integer courseId){
        int i = courseService.selectLiveStatus(courseId);
        return i;
    }



    /**
     * 查询学生已退课程
     * @param studentId
     * @return
     */
    @GetMapping("/selectRetiredCourse")
    public Object selectRetiredCourse(@RequestParam("studentId") Integer studentId){
        List<Course> courses = courseService.selectRetiredCourse(studentId);
        Result<List<Course>> result =new Result<>();
        if (courses!=null){
            result.setMessage("查询成功");
            result.setCode(2001);
            result.setData(courses);
        }else {
            result.setMessage("查询成功");
            result.setCode(4001);
        }
        return result;

    }

    //猜你喜欢
    @RequestMapping("/guest")
    public Result guess(@RequestParam("studentId") Integer studentId) {
        System.out.println("========="+studentId);
        // 验证 userId 是否有效，例如通过查询数据库确认该用户存在
        Student student = studentMapper.findById(studentId);
        if (student.getStudentLike() != null) {
            List<String> likesList = Arrays.asList(student.getStudentLike().split(","));
            List<Course> courseList = new ArrayList<>();

            for (String like : likesList) {
                List<Course> categoryIdsByName = courseService.getCategoryIdsByName(like);
                for (Course course : categoryIdsByName) {
                    courseList.add(course);
                }
            }
            Result result = new Result<>();
            result.setData(courseList);
            result.setCode(1001);
            result.setMessage("操作成功");
            return result;

        }
        Result result = new Result<>();
        result.setCode(1002);
        result.setMessage("操作失败");

        return result;
    }


}
