package com.xhb.autoano.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xhb.autoano.dao.UserDao;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public void saveUser() {
        System.out.println("UserServersImpl saveUser()");
        userDao.saveUser();
    }
    
}
