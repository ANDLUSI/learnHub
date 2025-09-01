package com.csi.service;

import com.csi.domain.CollectionMy;
import com.csi.domain.CollectionDTO;

import java.util.List;

public interface CollectionService {

    //新增收藏
    int add(CollectionDTO collection);

    //取消收藏
    int del(Integer id);

    //查找当前学生的所有收藏
    List<CollectionMy> findListBySId(Integer studentId);

    //查找当前课程是否被收藏
    CollectionDTO findCollection(CollectionDTO collectionDTO);
}
