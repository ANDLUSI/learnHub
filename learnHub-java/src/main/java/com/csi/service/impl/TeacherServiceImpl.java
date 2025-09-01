package com.csi.service.impl;

import com.csi.domain.Course;
import com.csi.domain.Live;
import com.csi.domain.OrderInfoDTO;
import com.csi.domain.Teacher;
import com.csi.mapper.CourseMapper;
import com.csi.mapper.TeacherMapper;
import com.csi.service.TeacherService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private CourseMapper courseMapper;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    private static final String TEACHER_COURSES_KEY = "teacher:courses:";




    //开启直播
    @Override
    public Integer startLive(Course course, Live live) {

        //修改课程表中当前课程的直播状态
        teacherMapper.modifyCourseLiveStatus(course);

        //往直播表中添加数据
        teacherMapper.saveLive(live);

        return live.getId();

    }

    //结束直播
    @Override
    public void stopLive(Course course,Integer liveId) {

        //修改课程表中，该课程的直播状态
        teacherMapper.modifyCourseLiveStatus(course);

        //修改直播表中的，这门课程的直播状态
        teacherMapper.modifyLiveLiveStatus(liveId);

    }



    @Override
    public Live findTeaIsLive(Integer teacherId) {

        return teacherMapper.findTeaIsLive(teacherId);

    }


    @Override
    public List<Course> findCourseByTeaId(String teacherId) {
//        //设置redis存储的键，用教师的id做key
//        String key =  teacherId;
//
//        List<Course> courses = (List<Course>) redisTemplate.opsForValue().get(key);
//
//        if(courses == null || courses.isEmpty()){
//
//
//
//            // 将数据缓存到 Redis 中
//            redisTemplate.opsForValue().set(key, courses);
//        }
        return courseMapper.findCourseByTeaId(teacherId);
    }

    @Override
    public List<Course> findCourseByTeacherId(Integer teacherId) {
        return teacherMapper.findCourseByTeacherId(teacherId);
    }

    //更新视频进度
    @Override
    public Object teacherVideoTimer(String teacherId, Integer lessonId, Double videoTimer) {
        System.out.println("======" + videoTimer + "=======");
        HashOperations<String, Object, Object> opsForHash = redisTemplate.opsForHash();
        //参数：学生id   课时id   视频进度
        opsForHash.put("teacher: " + teacherId, lessonId, videoTimer);
        Object timer = opsForHash.get(teacherId, lessonId);
        return timer;
    }

    //查询视频进度
    @Override
    public Object teacherReadTimer(String teacherId, Integer lessonId) {
        HashOperations<String, Object, Object> opsForHash = redisTemplate.opsForHash();
        Object readTimer = opsForHash.get("teacher: " + teacherId, lessonId);
        return readTimer;
    }

    @Override
    public List<OrderInfoDTO> selTeacherOrder(Integer id) {
        return teacherMapper.selTeacherOrder(id);
    }

    @Override
    public Teacher selInformation(Integer TeacherId) {
        return teacherMapper.selInformation(TeacherId);
    }

}
