package com.xhb.life;

public class Life {
    private String name;

    // setter方法
    public void setName(String name) {
        System.out.println("2 Life setName...");
        this.name = name;
    }
    // 初始化方法
    public void init() {
        System.out.println("3 Life init...");
    }
    // 销毁方法
    public void destroy() {
        System.out.println("5 Life destroy...");
    }

    public String getName() {
        return name;
    }

    // 无参构造
    public Life() {
        System.out.println("1 Life constructor...");
    }
}
