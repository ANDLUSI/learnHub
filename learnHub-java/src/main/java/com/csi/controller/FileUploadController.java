package com.csi.controller;

import com.csi.domain.Result;
import com.csi.utils.OSSUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
public class FileUploadController {

    @PostMapping("/file/upload")
    public Object uploadFile(@RequestParam("file") MultipartFile uploadFile) {
        try {
            Result<String> result = new Result<>("上传成功",2001);
            result.setData(OSSUtil.upload(uploadFile.getOriginalFilename(),uploadFile.getInputStream()));
            return result ;
        } catch (IOException e) {
            Result<String> result = new Result<>("上传失败",4001);
            return result ;
        }
    }

}
