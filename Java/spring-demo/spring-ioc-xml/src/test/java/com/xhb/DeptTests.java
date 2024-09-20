package com.xhb;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DeptTests {
    @Test
    public void testDept() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("dept.xml");
        Emp dept = (Emp) ctx.getBean("Emp");
        dept.work();
    }

    @Test
    public void testDeptP() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("dept.xml");
        Emp dept = (Emp) ctx.getBean("Emp2");
        dept.work();
    }
}
