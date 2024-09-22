# AOP

面向切片编程，将代码从业务逻辑中分离出来，通过切面进行声明式编程。

## 术语

- 连接点（Join Point）：程序执行的某个特定位置，如类开始初始化、方法被调用等。
- 切入点（Pointcut）：匹配连接点的表达式，即哪些连接点需要被织入通知。切入点可以是一个方法名，也可以是某个包下的所有方法。
- 通知（Advice）：在连接点执行的操作，即切面代码。
- 切面（Aspect）：通知和切入点的结合。
- 织入（Weaving）：将切面应用到目标对象，生成代理对象的过程。

## 环境搭建

> jdk 17 + Maven + Spring

### 依赖

```xml
<dependencies>
   <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>6.1.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-aop -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>6.1.12</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-aspects -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>6.1.6</version>
        </dependency>
</dependencies>
```

## 注解

### @Aspect

声明一个类为切面类。

### @Before

在目标方法执行前执行。

### @After

在目标方法执行后执行。

### @AfterReturning

在目标方法正常返回后执行。

### @AfterThrowing

在目标方法抛出异常后执行。

### @Around

在目标方法执行前后执行。

### @Pointcut

定义切入点表达式。

### @Order

定义切面的优先级，数字越小优先级越高。

### 示例

```java
@Aspect
@Component
@Order(2)
public class LogAspect {

    // 公用切入点
    @Pointcut("execution(* com.xhb.bean.CounterImpl.*(..))")
    public void publicPoint(){}

    // 前置通知
    @Before("publicPoint()")
    public void before(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("before " + methodName);
    }

    // 后置通知
    @After("publicPoint()")
    public void after(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("after " + methodName);
    }

    // 返回通知
    @AfterReturning(value = "publicPoint()", returning = "result")
    public void result(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("result " + methodName + ", 结果：" + result);
    }

    // 异常通知
    @AfterThrowing(value = "publicPoint()", throwing = "error")
    public void error(JoinPoint joinPoint, ObjectError error) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("error " + methodName + ", 错误信息：" + error.getDefaultMessage());
    }
}
```

