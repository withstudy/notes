package com.xhb;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class UserConTests {

    @Test
    public void testUserCon() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("bean.xml");
        // 根据id获取bean
        User user = (User) ctx.getBean("UserCon");
        user.say();
    }
}
