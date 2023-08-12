package com.mufeng.mufengapiinterface.controller;

import org.springframework.web.bind.annotation.*;

/**
 * @author Mufeng
 */
@RestController
@RequestMapping("/name")
public class NameController {
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user){

        return "Interface: "+ user.getUsername();
    }
}
