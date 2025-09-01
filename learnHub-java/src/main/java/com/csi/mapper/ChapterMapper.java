package com.csi.mapper;

import com.csi.domain.Chapter;
import java.util.List;

public interface ChapterMapper {

    //根据章节中的课程id查询章节信息
    List<Chapter> findChapterById(Integer id);

    //新增章节
    int insertChapter(Chapter chapter);

    //删除章节
    int del(Integer id);
}
