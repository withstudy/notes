package com.xhb.auto;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.xhb.auto.controller.UserController;

public class AutoTests {
    @Test
    public void testAuto() {
         ApplicationContext context = new ClassPathXmlApplicationContext("auto.xml");
         UserController userController = (UserController) context.getBean("userController");
         userController.saveUser();
    }
}
