package com.csi.service.impl;

import com.csi.domain.Category;

import com.csi.mapper.CategoryMapper;
import com.csi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> categoryList() {
        return categoryMapper.categoryList();
    }
}
