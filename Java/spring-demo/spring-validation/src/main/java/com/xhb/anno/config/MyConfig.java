package com.xhb.anno.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

@Configuration
@ComponentScan(basePackages = "com.xhb.anno")
public class MyConfig {
    @Bean
    public LocalValidatorFactoryBean validatory() {
        return new LocalValidatorFactoryBean();
    }

    // 基于方法的校验
    @Bean
    public MethodValidationPostProcessor MethodValidationPostProcessom() {
        return new MethodValidationPostProcessor();
    }
}
