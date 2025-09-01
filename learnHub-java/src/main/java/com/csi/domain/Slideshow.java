package com.csi.domain;

import lombok.Data;

//轮播图
@Data
public class Slideshow {
    private Integer id;

    private String imagesUrl;

    private String name;

    private Integer order;
}
