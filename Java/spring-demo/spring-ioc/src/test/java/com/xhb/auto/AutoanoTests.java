package com.xhb.auto;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.xhb.autoano.config.MySpringConfig;
import com.xhb.autoano.controller.UserController;

public class AutoanoTests {
    @Test
    public void testAutoano() {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MySpringConfig.class);
        UserController userController = (UserController)ctx.getBean("userController");
        userController.saveUser();
    }
}
