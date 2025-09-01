package com.csi.mapper;

import com.csi.domain.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderMapper {

    //添加订单
    int addOrder(Order order);

    //查询所有订单
    List<Order> selOrder(@Param("studentId")Integer studentId);
    int modifyOrderStatus(@Param("orderStatus") Integer orderStatus, @Param("studentId") Integer studentId,@Param("courseId")Integer courseId);

    //查询订单价格
    double findOrderPrice(@Param("studentId") Integer studentId,@Param("courseId") Integer courseId);

    List<Order> selectRetiredCourse(@Param("studentId")Integer studentId);

}
