# Spring

## IOC

### Bean的作用域

- singleton：单例，默认作用域，在创建IOC容器时实例化bean，整个IOC容器中只有一个bean实例
- prototype：多例，在getBean时实例化bean，每次请求返回一个新的bean

在WebApplicationContext中，还可以使用另外三个作用域：

- request: 每次HTTP请求都会创建一个新的bean，该bean仅在当前HTTP request内有效
- session: 当前会话有效，同一次会话共享一个bean

### Bean的生命周期

- 创建bean实例，调用无参构造函数
- 设置bean属性
- 后置处理器：调用postProcessBeforeInitialization方法
- bean初始化方法
- 后置处理器：调用postProcessAfterInitialization方法
- bean可以使用
- bean销毁方法

#### 后置处理器

```java
package com.xhb.life;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

public class MyBeanPostProcessor implements BeanPostProcessor{
    
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("🌟初始化之前");
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("🌟初始化之后");
        return bean;
    }
    
}
```

```xml
<bean id="myBeanPostProcessor" class="com.xhb.life.MyBeanPostProcessor"/>
```

> 注意：后置处理器是针对所有bean的，如果只想针对某个bean，可以在bean标签中添加init-method属性

### Bean的自动装配

- byName：根据bean的名称进行自动装配，要求bean的id名和另一个bean的属性名相同
- byType：根据bean的类型进行自动装配，要求IOC容器中只有一个类型匹配的bean，否则会报错
- constructor：根据构造函数进行自动装配，要求构造函数的参数类型在IOC容器中有一个匹配的bean，否则会报错
- autodetect：先尝试使用constructor进行自动装配，如果失败则使用byType进行自动装配

```xml
<bean id="userService" class="com.xhb.service.UserService" autowire="byName"/>
```

### FactoryBean

FactoryBean是Spring中的一种特殊bean，它不是直接返回bean实例，而是返回一个工厂bean的实例。

```java
package com.xhb.factorybean;

import org.springframework.beans.factory.FactoryBean;

public class MyFactoryBean implements FactoryBean<User> {

    @Override
    public User getObject() throws Exception {
        return new User();
    }

    @Override
    public Class<?> getObjectType() {
        return User.class;
    }
    
}
```

```xml
<bean id="user" class="com.xhb.factorybean.MyFactoryBean"/>
```
