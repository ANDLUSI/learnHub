package com.csi.service.impl;

import com.csi.domain.Chapter;
import com.csi.mapper.ChapterMapper;
import com.csi.service.ChapterService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterServiceImpl implements ChapterService {
    @Autowired
    private ChapterMapper chapterMapper;

    @Override
    public List<Chapter> findChapterById(Integer id) {
        return chapterMapper.findChapterById(id);
    }

    @Override
    public int insertChapter(Chapter chapter) {
        return chapterMapper.insertChapter(chapter);
    }

    @Override
    public int del(Integer id) {
        return chapterMapper.del(id);
    }
}
