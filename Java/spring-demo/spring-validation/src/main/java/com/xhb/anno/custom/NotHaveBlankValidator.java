package com.xhb.anno.custom;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotHaveBlankValidator implements ConstraintValidator<NotHaveBlank, String> {

    @Override
    public void initialize(NotHaveBlank constraintAnnotation) {
        // 初始化方法
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value != null && value.contains(" ")) {
            // 获取默认的错误提示信息
            String defaultConstraintMessageString = context.getDefaultConstraintMessageTemplate();
            // 禁用默认的错误提示信息
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("can not have blank").addConstraintViolation();
            return false;
        }
        return  false;
    }

}
