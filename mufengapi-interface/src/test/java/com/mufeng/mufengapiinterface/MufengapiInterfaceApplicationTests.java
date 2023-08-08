package com.mufeng.mufengapiinterface;

import com.mufeng.mufengapiclientsdk.client.MufengAPIClient;
import com.mufeng.mufengapiclientsdk.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class MufengapiInterfaceApplicationTests {

    @Resource
    private MufengAPIClient mufengAPIClient;

    @Test
    void contextLoads() {
        String result  = mufengAPIClient.getNamebyGet("asdf");
        User user  = new User();
        user.setUsername("asdf");
        String usernamebypost = mufengAPIClient.getUsernameByPost(user);
        System.out.println(result);
        System.out.println(usernamebypost);
    }

}
