package com.csi.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    //常量
    public static final long EXPIRE = 1000 * 60 * 60 * 4; //token过期时间,4个小时
    public static final String APP_SECRET = "ukc8BDbRigUDaY6pZFfWus2jZWLPHO"; //秘钥

    //生成token字符串的方法
    public static String getToken(String userId){
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .setSubject("user")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))
                .claim("empId", userId)//设置token主体部分 ，存储用户信息
                .signWith(SignatureAlgorithm.HS256, APP_SECRET)
                .compact();
    }

    //验证token字符串是否是有效的  包括验证是否过期
    public static boolean checkToken(String jwtToken) {
        if(jwtToken == null || jwtToken.isEmpty()){
            return false;
        }
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(jwtToken);
            Claims body = claims.getBody();
            if ( body.getExpiration().after(new Date(System.currentTimeMillis()))){
                return true;
            } else
                return false;
        } catch (Exception e) {
            return false;
        }
    }

    public static Claims getTokenBody(String jwtToken){
        if(jwtToken == null || jwtToken.isEmpty()){
            return null;
        }
        try {
            return Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(jwtToken).getBody();
        } catch (Exception e){
            return null;
        }
    }
}