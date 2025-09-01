package com.csi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate; // 注意这里Object类型
    //更新会话内容
    @PostMapping("/UpdateSession")
    public Map<String, Object> createOrUpdateSession(@RequestBody Map<String, Object> sessionData) {
        String sessionId = (String) sessionData.get("sessionId");
        List<Map<String, Object>> messages = (List<Map<String, Object>>) sessionData.get("messages");

        if (redisTemplate.hasKey(sessionId)) {
            // 更新现有会话
            redisTemplate.opsForValue().set(sessionId, messages, 6, TimeUnit.HOURS);
        } else {
            // 创建新会话
            redisTemplate.opsForValue().set(sessionId, messages, 6, TimeUnit.HOURS);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", sessionId);
        response.put("sessionData", messages);

        return response;
    }

    //获取会话数据
    @GetMapping("/getSessionData")
    public Map<String, Object> getSessionData(@RequestParam("sessionId") String sessionId) {
        Map<String, Object> response = new HashMap<>();

        // 检查Redis中是否有对应的sessionId
        if (redisTemplate.hasKey(sessionId)) {
            List<Map<String, Object>> sessionData = (List<Map<String, Object>>) redisTemplate.opsForValue().get(sessionId);
            response.put("sessionId", sessionId);
            response.put("sessionData", sessionData);
        } else {
            response.put("error", "Session not found");
        }

        return response;
    }
}