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
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user, HttpServletRequest request){

        return "Interface: "+ user.getUsername();
    }
}
