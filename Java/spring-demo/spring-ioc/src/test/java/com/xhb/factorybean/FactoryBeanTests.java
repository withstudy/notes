package com.xhb.factorybean;


import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class FactoryBeanTests {
    @Test
    public void testFactoryBean() {
        ApplicationContext context = new ClassPathXmlApplicationContext("factorybean.xml");

        User user = (User) context.getBean("user");
        System.out.println(user.getName());
        ((ClassPathXmlApplicationContext) context).close();
    }
}
