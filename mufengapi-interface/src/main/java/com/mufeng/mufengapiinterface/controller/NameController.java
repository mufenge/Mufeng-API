package com.mufeng.mufengapiinterface.controller;


import com.mufeng.mufengapiclientsdk.model.User;
import com.mufeng.mufengapiclientsdk.utils.SignUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Mufeng
 */
@RestController
@RequestMapping("/name")
public class NameController {

    @GetMapping("/")
    public String getNamebyGet(String name){

        return "GET:你的名字" +name;
    }
    @PostMapping("/")
    public String getNameByPost(@RequestParam String name){
        return "POST:你的名字"+name;
    }
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user, HttpServletRequest request){
        String accessKey=request.getHeader("accessKey");
        String nonce=request.getHeader("nonce");
        String timestamp=request.getHeader("timestamp");
        String sign=request.getHeader("sign");
        String body=request.getHeader("body");
        //实际情况根据数据库查询
        if(!accessKey.equals("asdf")){
            throw new RuntimeException("无权限");
        }
        if (Long.parseLong(nonce)>10000){
            throw new RuntimeException("无权限");
        }

        String serversign = SignUtils.getSign(body,"abcdefgh");
        if (!sign.equals(serversign)){
            throw new RuntimeException("无权限");
        }
        return "POST： 你的名字"+ user.getUsername();
    }
}
