package com.xhb.code.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.xhb.code.bean.Persion;

public class PersionValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Persion.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors, "name", "name.empty", "name is empty");

        Persion persion = (Persion) target;
        if (persion.getAge() < 0) {
            errors.rejectValue("age", "age.min", "age must be greater than 0");
        }
    }
}
