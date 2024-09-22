package com.xhb.auto.controller;

import com.xhb.auto.service.UserService;

public class UserController {
    
    private UserService userService;
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void saveUser(){
        System.out.println("userController save...");
        userService.saveUser();
    }
    
}
