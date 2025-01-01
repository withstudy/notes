package com.xhb.anno.service;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.xhb.anno.bean.User;

import jakarta.validation.Valid;

@Service
@Validated
public class MethodService {

    
    public String testMethodValidation(@NonNull @Valid User user) {
        return user.toString();
    }
}
