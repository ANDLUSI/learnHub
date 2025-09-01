package com.csi.domain;

import lombok.ToString;

@ToString
public class Result<T>{

    private String token;

    private String message ;

    private int code ;

    private String msg;

    private T data ;

    public Result(){}

    public Result(String message, int code){
        this.code = code;
        this.message = message;
    }

    public Result(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
