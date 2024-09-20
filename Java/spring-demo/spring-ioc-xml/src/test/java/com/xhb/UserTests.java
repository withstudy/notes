package com.xhb;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class UserTests {
    @Test
    public void testUser() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("bean.xml");
        // 根据id获取bean
        User user = (User)ctx.getBean("User");
        user.say();
        user.setName("xcl");

        // 根据类型获取bean
        // User user2 = ctx.getBean(User.class);
        // user2.say();

        // 根据id和类型获取bean
        // User user3 = ctx.getBean("User", User.class);
        // user3.say();
    }
}
