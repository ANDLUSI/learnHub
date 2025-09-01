package com.csi.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private int code;
    private String msg;
    private Object data;
    public static  Result ok(){
        return  new Result(200,"成功",null);
    }
    public static  Result ok(Object data){
        return  new Result(200,"成功",data);
    }
    public static  Result error(){
        return  new Result(500,"失败",null);
    }
    public static  Result error(String msg){
        return  new Result(500,msg,null);
    }
}
