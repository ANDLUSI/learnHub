package com.csi.controller;

import com.csi.domain.Course;
import com.csi.domain.Order;
import com.csi.domain.Result;
import com.csi.service.CourseService;
import com.csi.service.OrderService;
import com.csi.service.StudentCourseService;
import com.sun.source.tree.VariableTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private StudentCourseService studentCourseService;

    @PostMapping("/add")
    public Object add(@RequestBody Order order){
        System.out.println(order);
        SimpleDateFormat format =new SimpleDateFormat("yyyy-MM-dd");
        String formatted = format.format(new Date());
        order.setCourseBuyDate(formatted);
        int ret = orderService.addOrder(order);

        if (ret!=0){
            //绑定学生与课程关系
            studentCourseService.bindStudentCourse(order);
            Result result = new Result<>("操作成功",2001);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }

    /**
     * 查看学生底下的订单
     * @param studentId
     * @return
     */
    @RequestMapping("/selOrder")
    public Object selOrder(@RequestParam("studentId") Integer studentId){
        List<Order> list = orderService.selOrder(studentId);
        if (!list.isEmpty()){
            Result result = new Result<>("操作成功",2001);
            result.setData(list);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }




}
