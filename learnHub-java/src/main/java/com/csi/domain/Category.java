package com.csi.domain;

import lombok.Data;

//分类表
@Data
public class Category {

    private Integer id;

    private String categoryName;

    //父级标题的id
    private Integer parentId;

}
