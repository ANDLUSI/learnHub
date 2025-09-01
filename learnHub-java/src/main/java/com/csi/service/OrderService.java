package com.csi.service;

import com.csi.domain.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    //添加订单
    int addOrder(Order order);

    //查询所有订单
    List<Order> selOrder(Integer studentId);

    //查询订单价格
    double findOrderPrice(Integer studentId, Integer courseId);



}
