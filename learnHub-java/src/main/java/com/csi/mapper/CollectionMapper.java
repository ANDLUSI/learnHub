package com.csi.mapper;

import com.csi.domain.CollectionMy;
import com.csi.domain.CollectionDTO;

import java.util.List;

public interface CollectionMapper {

    //新增收藏
    int add(CollectionDTO collection);

    //取消收藏
    int del(Integer id);

    //查找当前学生的所有收藏
    List<CollectionMy> findListBySId(Integer studentId);

    CollectionDTO findCollection(CollectionDTO collectionDTO);
}
