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

## 注解

### @Autowired

- 默认按照类型进行自动装配，如果IOC容器中存在多个类型匹配的bean，则按照名称进行匹配
- 可以使用@Qualifier注解指定bean的名称

### @Resource

- 默认按照名称进行自动装配，如果找不到匹配的bean，则按照类型进行匹配
- 可以使用name属性指定bean的名称

> jdk11以上，jdk自带的javax.annotation.Resource注解已经废弃，需要引入依赖
```xml
<dependency>
    <groupId>jakarta.annotation</groupId>
    <artifactId>jakarta.annotation-api</artifactId>
    <version>2.1.1</version>
</dependency>
```

### @Component

- 标记一个类为Spring的组件，Spring会自动扫描并创建该类的实例
- 可以使用value属性指定bean的名称

### @Service

- 标记一个类为Spring的服务层组件，Spring会自动扫描并创建该类的实例
- 可以使用value属性指定bean的名称

### @Repository

- 标记一个类为Spring的持久层组件，Spring会自动扫描并创建该类的实例
- 可以使用value属性指定bean的名称

### @Controller

- 标记一个类为Spring的控制器组件，Spring会自动扫描并创建该类的实例
- 可以使用value属性指定bean的名称

### @Configuration

- 标记一个类为Spring的配置类，Spring会自动扫描并创建该类的实例
- 可以使用value属性指定bean的名称

### @ComponentScan

- 标记一个类为Spring的组件扫描器，Spring会自动扫描并创建该类的实例
- 可以使用basePackages属性指定要扫描的包名

### @Bean

- 标记一个方法为Spring的bean，Spring会自动调用该方法并创建该方法的返回值作为bean
- 可以使用name属性指定bean的名称

### @Scope

- 标记一个bean的作用域，默认为singleton
- 可以使用value属性指定bean的作用域，例如prototype、request、session、application等

### @PostConstruct

- 标记一个方法为bean的初始化方法，Spring会在bean创建后自动调用该方法
- 可以使用value属性指定方法名

### @PreDestroy

- 标记一个方法为bean的销毁方法，Spring会在bean销毁前自动调用该方法
- 可以使用value属性指定方法名

### @Value

- 标记一个属性为Spring的属性值，Spring会自动注入该属性的值
- 可以使用value属性指定属性的值

### @PropertySource

- 标记一个类为Spring的属性源，Spring会自动加载该类的属性文件
- 可以使用value属性指定属性文件的路径
