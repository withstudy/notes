package com.xhb.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.validation.ObjectError;

@Aspect
@Component
@Order(2)
public class LogAspect {

    // 公用切入点
    @Pointcut("execution(* com.xhb.bean.CounterImpl.*(..))")
    public void publicPoint(){}

    // 前置通知
    @Before("publicPoint()")
    public void before(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("before " + methodName);
    }

    // 后置通知
    @After("publicPoint()")
    public void after(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("after " + methodName);
    }

    // 返回通知
    @AfterReturning(value = "publicPoint()", returning = "result")
    public void result(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("result " + methodName + ", 结果：" + result);
    }

    // 异常通知
    @AfterThrowing(value = "publicPoint()", throwing = "error")
    public void error(JoinPoint joinPoint, ObjectError error) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("error " + methodName + ", 错误信息：" + error.getDefaultMessage());
    }
}