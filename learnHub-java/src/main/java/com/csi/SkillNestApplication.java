package com.csi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.csi.mapper")
public class SkillNestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillNestApplication.class, args);
    }

}
