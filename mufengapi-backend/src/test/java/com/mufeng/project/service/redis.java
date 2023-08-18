package com.mufeng.project.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * @author Mufeng
 */
@SpringBootTest
public class redis {
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    public void redisTest(){
      redisTemplate.opsForValue().set("mufeng","qwer");
        System.out.println(redisTemplate.opsForValue().get("mufeng"));
    }

}
