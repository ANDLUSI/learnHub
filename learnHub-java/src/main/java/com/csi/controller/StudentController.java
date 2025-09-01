package com.csi.controller;

import com.csi.domain.Result;
import com.csi.domain.Student;
import com.csi.domain.Teacher;
import com.csi.service.StudentService;
import com.csi.utils.OSSUtil;
import com.csi.utils.SmsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    //验证用户名是否存在
    @RequestMapping("validUsername")
    public boolean validUsername(@RequestParam("username") String studentName){

        Student student = studentService.findByName(studentName);

        if (student!=null){
            return  true;
        }
        return false;
    }

    /**
     * 修改学生信息
     * @param student
     * @return
     */
    @RequestMapping("/modify")
    public Object modify(Student student, @RequestParam(value = "photo",required = false) MultipartFile photo) throws IOException {

        if (photo!=null){
            //上传图片到阿里云
            String path = OSSUtil.upload(photo.getOriginalFilename(), photo.getInputStream());
            student.setStudentHeadphone(path);
        }

        int ret = studentService.update(student);
        if (ret!=0){
            Result result = new Result<>("操作成功",2001);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }


    /**
     * 通过id查找学生
     * @param studentId
     * @return
     */
    @RequestMapping("/findById")
    public Object findById(@RequestParam("studentId") Integer studentId){
        System.out.println("========================="+studentId);
        Student student = studentService.findById(studentId);
        if (student!=null){
            Result result = new Result<>("操作成功",2001);
            result.setData(student);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }

    /**
     * 密码登录
     * @param studentName
     * @param studentPassword
     * @return
     */
    @RequestMapping("/login1")
    public Result login(@RequestParam(value="studentName") String studentName,
                        @RequestParam(value="studentPassword") String studentPassword) {
        System.out.println("================" + studentName);
        System.out.println("================" + studentPassword);
        Student students = studentService.loginStudent(studentName,studentPassword);
        Result result = null;
        if (!students.getStudentName().equals(studentName) && !students.getStudentPassword().equals(studentPassword)) {
            result = new Result("登录失败" , 4001);
        } else {
            result = new Result("登陆成功" , 2001);
            result.setData(students);
        }
        return result;
    }

    /**
     * 密码登录（老师）
     * @param teacherName
     * @param teacherPassword
     * @return
     */
    @RequestMapping("/loginTeacher")
    public Result loginTeacher(@RequestParam(value="studentName") String teacherName,
                               @RequestParam(value="studentPassword") String teacherPassword){
        System.out.println("================" + teacherName);
        System.out.println("================" + teacherPassword);
        Teacher teacher = studentService.loginTeacher(teacherName, teacherPassword);
        Result result = null;
        if(!teacher.getTeacherName().equals(teacherName) && !teacher.getTeacherPassword().equals(teacherPassword)) {
            result = new Result("登录失败" , 4001);
        } else {
            result = new Result("登陆成功" , 2001);
            result.setData(teacher);
        }
        return result;
    }

    /**
     * 发送验证码
     * @param studentPhone
     */
    @RequestMapping("/sendCode")
    public void sendCode(@RequestParam("studentPhone") String studentPhone) {
        System.out.println("=========shoujihao"+studentPhone);
        try {
            String code = SmsUtils.sendSms(studentPhone);
            redisTemplate.opsForValue().set(studentPhone, code, 5, TimeUnit.MINUTES);
            System.out.println(code);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 验证码登录code对比
     * @param studentPhone
     * @param code
     * @return
     */
    @RequestMapping("/codeLogin")
    public Result codeLogin(@RequestParam(value="studentPhone") String studentPhone,
                            @RequestParam(value = "code") String code) {
        System.out.println("studentPhone = " + studentPhone + ", code = " + code);

        Student student = studentService.findByPhone(studentPhone);

        Result result = null;
        if (student != null) {
            if (code.equals(redisTemplate.opsForValue().get(studentPhone))) {
                result = new Result("验证码正确" , 2001);
                result.setData(student);
            } else {
                result = new Result("验证码错误" , 4001);
            }
        } else {
            result = new Result("用户不存在" , 103);
        }
        return result;
    }

    /**
     * 验证码注册对比
     * @param studentPhone
     * @param code
     * @return
     */
    @RequestMapping("/codeReg")
    public Result codeReg(@RequestParam(value="studentPhone") String studentPhone,
                            @RequestParam(value = "code") String code) {
        System.out.println("studentPhone = " + studentPhone + ", code = " + code);

//        Student student = studentService.findByPhone(phone);

        Result result = null;
            if (code.equals(redisTemplate.opsForValue().get(studentPhone))) {
                result = new Result("验证码正确" , 2001);
            } else {
                result = new Result("验证码错误" , 4001);
            }
        return result;
    }

    /**
     * 注册（学生）
     */
    @RequestMapping("/save")
    public Result save(@RequestBody Student student) {
        System.out.println(student);


        student.setStudentCreatedate(new Date());
        Student studentName = studentService.findByName(student.getStudentName());
        Result result = null;
        if(studentName == null) {
            studentService.save(student);
            result = new Result("注册成功" , 2001);
        }else {
            result = new Result("注册失败" , 4001);
        }
        return result;
    }

    /**
     * 选择喜欢的专业（新用户）
     * @param likeString
     * @param studentId
     * @return
     */
    @PostMapping("/saveLike")
    public Object saveLike(@RequestParam(value = "likeString", required = false) String likeString,
                           @RequestParam(value = "studentId", required = false) Integer studentId){
        System.out.println("Received likeString: " + likeString);
        System.out.println("Received studentId: " + studentId);

        if (likeString == null || studentId == null) {
            return new Result<>("缺少必要参数", 4001);
        }

        // 这里调用service层方法进行保存操作
         int ret = studentService.saveLike(likeString, studentId);
        if (ret != 0){
            return new Result<>("操作成功", 2001);
        }
        return new Result<>("操作失败", 4001);
    }


}
