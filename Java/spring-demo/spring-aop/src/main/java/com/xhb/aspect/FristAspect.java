package com.xhb.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
public class FristAspect {

    // 环绕通知
    @Around("execution(* com.xhb.bean.CounterImpl.*(..))")
    public Object around(ProceedingJoinPoint joinPoint){
        String methodName = joinPoint.getSignature().getName();
        Object[ ] args = joinPoint.getArgs();
        System.out.println("around before");
        Object result = null;
        try {
            // 执行目标方法
            result = joinPoint.proceed();
            System.out.println("around proceed");
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            System.out.println("around error");
        } finally {
            System.out.println("around after");
        }
        return result;
    }
}
