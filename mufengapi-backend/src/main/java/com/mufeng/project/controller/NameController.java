package com.mufeng.project.controller;

import com.mufeng.model.entity.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mufeng
 */
@RestController
@RequestMapping("/name")
public class NameController {
    @PostMapping("/user")
    public String getUsernameByPost(@RequestBody User user){
        return "Interface: "+ user.getUserAccount();
    }
}
