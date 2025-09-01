package com.csi.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.ObjectMetadata;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class OSSUtil {

    //区域
    private static String endpoint = "oss-cn-beijing.aliyuncs.com";
    //访问id
    private static String KeyId = "KeyId";
    //访问秘钥
    private static String KeySecret = "KeySecret";
    //桶名称
    private static String bucketName = "learnhub";
    //访问URL
    private static String url = "https://learnhub.oss-cn-beijing.aliyuncs.com";


    //文件上传
    public static String upload(String fileName, InputStream inputStream) {

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, KeyId, KeySecret);

        // 上传文件流。
        // <yourObjectName>表示上传文件到OSS时需要指定包含文件后缀在内的完整路径，例如 images/2020/11/11/asdf.jpg。
        String objectName = "images/" + new SimpleDateFormat("yyyy/MM/dd").format(new Date())
                + "/" + System.currentTimeMillis() + fileName.substring(fileName.lastIndexOf("."));

        // meta设置请求头,解决访问图片地址直接下载
        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentType(getContentType(fileName.substring(fileName.lastIndexOf("."))));
        ossClient.putObject(bucketName, objectName, inputStream, meta);

        // 关闭OSSClient。
        ossClient.shutdown();

        return url + "/" + objectName;
    }

    public static String getContentType(String FilenameExtension) {
        if (FilenameExtension.equalsIgnoreCase(".bmp")) {
            return "image/bmp";
        }
        if (FilenameExtension.equalsIgnoreCase(".gif")) {
            return "image/gif";
        }
        if (FilenameExtension.equalsIgnoreCase(".jpeg") ||
                FilenameExtension.equalsIgnoreCase(".jpg") ||
                FilenameExtension.equalsIgnoreCase(".png")) {
            return "image/jpeg"; // 修正了这里的返回值
        }

        // 视频类型
        if (FilenameExtension.equalsIgnoreCase(".mp4")) {
            return "video/mp4";
        }
        if (FilenameExtension.equalsIgnoreCase(".avi")) {
            return "video/x-msvideo";
        }
        if (FilenameExtension.equalsIgnoreCase(".mov")) {
            return "video/quicktime";
        }
        if (FilenameExtension.equalsIgnoreCase(".mkv")) {
            return "video/x-matroska";
        }
        if (FilenameExtension.equalsIgnoreCase(".webm")) {
            return "video/webm";
        }
        if (FilenameExtension.equalsIgnoreCase(".flv")) {
            return "video/x-flv";
        }
        if (FilenameExtension.equalsIgnoreCase(".m3u8")) {
            return "application/vnd.apple.mpegurl";
        }
        if (FilenameExtension.equalsIgnoreCase(".ts")) {
            return "video/mp2t";
        }

        // 如果是其他类型的文件，默认返回 image/jpeg 或者 application/octet-stream（二进制流）
        return "application/octet-stream";
    }

}
