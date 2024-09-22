package com.xhb.auto.service;

import com.xhb.auto.dao.UserDao;

public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void saveUser() {
        System.out.println("UserServersImpl saveUser()");
        userDao.saveUser();
    }
    
}
