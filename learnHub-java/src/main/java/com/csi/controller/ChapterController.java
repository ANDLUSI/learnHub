package com.csi.controller;


import com.csi.domain.Chapter;
import com.csi.domain.Result;
import com.csi.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chapter")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;


    /**
     * 查询课程下所有章节
     * @param courseId
     * @return
     */
    @GetMapping("/findChapters")
    public Object findChaptersByCourseId(@RequestParam("courseId") Integer courseId){

        List<Chapter> chapterList = chapterService.findChapterById(courseId);
        Result<List<Chapter>> result =new Result<>();
        if (chapterList!=null){
            result.setCode(2001);
            result.setMessage("查询成功！");
            if (!chapterList.isEmpty()){
                result.setData(chapterList);
            }
        }else {
            result.setCode(4001);
            result.setMessage("查询失败！");
        }

        return  result;
    }


}
