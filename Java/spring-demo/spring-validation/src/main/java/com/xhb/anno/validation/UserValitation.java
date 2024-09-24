package com.xhb.anno.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindException;
import org.springframework.validation.Validator;

import com.xhb.anno.bean.User;

@Service
public class UserValitation {

    @Autowired
    private Validator validator;

    public boolean validateUserName(User user) {
        BindException exception = new BindException(user, user.getName());
        validator.validate(user, exception);
        System.out.println(exception.getAllErrors().toString());
        return exception.hasErrors();
    }

    public boolean validateUserDesc(User user) {
        BindException exception = new BindException(user, user.getDescription());
        validator.validate(user, exception);
        System.out.println(exception.getAllErrors().toString());
        return exception.hasErrors();
    }
}
