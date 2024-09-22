package com.xhb.autoano.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xhb.autoano.service.UserService;

@Controller
public class UserController {
    
    @Autowired
    private UserService userService;

    public void saveUser(){
        System.out.println("userController save...");
        userService.saveUser();
    }
    
}
