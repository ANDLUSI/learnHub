package com.csi.service.impl;

import com.csi.domain.CollectionMy;
import com.csi.domain.CollectionDTO;
import com.csi.mapper.CollectionMapper;
import com.csi.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionMapper collectionMapper;

    @Override
    public int add(CollectionDTO collection) {
        return collectionMapper.add(collection);
    }

    @Override
    public int del(Integer id) {
        return collectionMapper.del(id);
    }

    @Override
    public List<CollectionMy> findListBySId(Integer studentId) {
        return collectionMapper.findListBySId(studentId);
    }

    @Override
    public CollectionDTO findCollection(CollectionDTO collectionDTO) {
        return collectionMapper.findCollection(collectionDTO);
    }
}
