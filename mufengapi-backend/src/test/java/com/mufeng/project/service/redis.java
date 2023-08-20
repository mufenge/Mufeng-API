package com.mufeng.project.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * @author Mufeng
 */
@SpringBootTest
public class redis {
    @Resource
    JavaMailSender javaMailSender;
    @Autowired
    @Qualifier("myRedisTemplate")
    private RedisTemplate redisTemplate;
    @Test
    void contextLoads() {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        StringBuilder randomInt = new StringBuilder();;
        for (int i = 0; i < 6; i++) {
            randomInt.append((int) (Math.random() * 10));
        }
        redisTemplate.opsForValue().set("code" + randomInt, randomInt);
        redisTemplate.expire("code" + randomInt, 180, TimeUnit.SECONDS);
        mailMessage.setFrom("2216391020@qq.com");
        String email ="19572216227@163.com";
        mailMessage.setTo(email);
        mailMessage.setText("您的验证码：" + randomInt + "有效时间为3分钟，请尽快完成注册，注册后可用邮箱号作为账号登录。");
        mailMessage.setSubject("Mufeng-API");
        javaMailSender.send(mailMessage);
        System.out.println("====完成发送！====");
    }

}
