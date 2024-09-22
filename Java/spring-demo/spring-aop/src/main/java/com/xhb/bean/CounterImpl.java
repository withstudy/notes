package com.xhb.bean;

import org.springframework.stereotype.Component;

@Component
public class CounterImpl implements Counter{
    @Override
    public int add(int a, int b) {   
        System.out.println("add方法被调用了");
        return a + b;
    }
    
    @Override
    public int sub(int a, int b){
        System.out.println("sub方法被调用了");
        return a - b;
    }
    @Override
    public int mul(int a, int b) {
        System.out.println("mul方法被调用了");
        return a * b;
    }
    
    @Override
    public int div(int a, int b){
        System.out.println("div方法被调用了");
        return a / b;
    }

}
