package com.csi.mapper;

import com.csi.domain.OrderInfoDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderInfoDTOMapper {
    //查询学生课程订单信息
    List<OrderInfoDTO> selStudentOrder(@Param("id") Integer id);
}
