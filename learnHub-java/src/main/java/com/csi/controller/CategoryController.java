package com.csi.controller;

import com.csi.domain.Category;
import com.csi.domain.Result;
import com.csi.mapper.CategoryMapper;
import com.csi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    //查询类型
    @RequestMapping("/categoryList")
    public Result categoryList(){
        List<Category> categoryList = categoryService.categoryList();
        Result categoryListResult = null;
        if (categoryList != null && categoryList.size() != 0){
            categoryListResult = new Result(1001, "类型查询成功", categoryList);
        }else {
            categoryListResult = new Result<>("类型查询失败",1002);
        }
        return categoryListResult;
    }


}
