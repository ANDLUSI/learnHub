package com.csi.service.impl;

import com.csi.domain.Order;
import com.csi.mapper.OrderMapper;
import com.csi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public int addOrder(Order order) {
        return orderMapper.addOrder(order);

    }

    @Override
    public List<Order> selOrder(Integer studentId) {
        return orderMapper.selOrder(studentId);
    }

    @Override
    public double findOrderPrice(Integer studentId, Integer courseId) {
        return orderMapper.findOrderPrice(studentId,courseId);
    }

}
