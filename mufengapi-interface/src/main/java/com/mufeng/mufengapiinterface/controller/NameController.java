package com.mufeng.mufengapiinterface.controller;


import com.mufeng.mufengapiclientsdk.model.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Mufeng
 */
@RestController
@RequestMapping("/name")
public class NameController {

    @GetMapping("/get")
    public String getNameByGet(String name){

        return "GET:你的名字" +name;
    }
    @RequestMapping("/post")
    public String getNameByPost(@RequestParam String name){

        return "POST:你的名字"+name;
    }
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user, HttpServletRequest request){

        return "Interface: "+ user.getUsername();
    }
}
