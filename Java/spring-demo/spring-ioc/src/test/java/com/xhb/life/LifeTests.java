package com.xhb.life;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class LifeTests {
    @Test
    public void testLife() {
        // 1.加载配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("life.xml");
        // 2.获取对象
        Life person = (Life) context.getBean("Life");
        System.out.println("4 Use bean ..." + person.getName());
        // 4.关闭容器
        ((ClassPathXmlApplicationContext) context).close();
    }
}
