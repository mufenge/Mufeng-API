package com.mufeng.project.service;

import com.mufeng.project.common.RedisUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * @author Mufeng
 */
@SpringBootTest
public class redis {
    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate redisTemplate;
    @Test
    public void redisTest(){

        RedisUtil redisUtil = new RedisUtil();
        redisUtil.set("mufeng123","123");

        System.out.println(redisUtil.get("mufeng"));
    }

}
