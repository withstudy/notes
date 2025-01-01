# Validator

## 1. 简介

在 Spring 中，Validator 是一个用于验证数据的接口，它定义了一个 `validate` 方法，用于验证给定的对象是否符合特定的规则。Validator 接口位于 `org.springframework.validation` 包中。

## 2. 使用方式

### 1. 通过Spring Validator接口

```java
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;

        if (user.getName() == null || user.getName().isEmpty()) {
            errors.rejectValue("name", "required", "Name is required");
        }

        if (user.getEmail() == null || !user.getEmail().contains("@")) {
            errors.rejectValue("email", "invalid", "Email is invalid");
        }
    }
}
```

测试
```java
public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");

        UserValidator validator = new UserValidator();
        Errors errors = new BeanPropertyBindingResult(user, "user");

        ValidationUtils.invokeValidator(validator, user, errors);

        if (errors.hasErrors()) {
            System.out.println("Validation failed");
            errors.getAllErrors().forEach(error -> {
                System.out.println(error.getDefaultMessage());
            });
        } else {
            System.out.println("Validation succeeded");
        }
    }
}
```

### 2. 通过注解

```java
public class User {
    @NotNull(message = "Name is required")
    private String name;

    @Email(message = "Email is invalid")
    private String email;

    // getters and setters
}
```

spring配置类

```java
@Configuration
public class AppConfig {

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}
```

测试

```java
public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Validator validator = context.getBean(Validator.class);

        Set<ConstraintViolation<User>> violations = validator.validate(user);

        if (!violations.isEmpty()) {
            System.out.println("Validation failed");
            violations.forEach(violation -> {
                System.out.println(violation.getMessage());
            });
        } else {
            System.out.println("Validation succeeded");
        }
    }
}
```

### 基于方法 @Validated

```java
@Service
@Validated
public class MethodService {

    
    public String testMethodValidation(@NonNull @Valid User user) {
        return user.toString();
    }
}
```
测试

```java
public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        MethodService methodService = context.getBean(MethodService.class);

        try {
            methodService.testMethodValidation(user);
            System.out.println("Validation succeeded");
        } catch (MethodArgumentNotValidException e) {
            System.out.println("Validation failed");
            e.getBindingResult().getAllErrors().forEach(error -> {
                System.out.println(error.getDefaultMessage());
            });
        }
    }
}
```

## 3. 自定义校验注解

```java
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = { NotHaveBlankValidator.class })
public @interface NotHaveBlank {
     String message() default "不能包含空格";

 Class<?>[] groups() default { };

 Class<? extends Payload>[] payload() default { };

 @Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
 @Retention(RUNTIME)
 @Documented
 @interface List {

  NotHaveBlank[] value();
 }
}
```
实现注解
```java
public class NotHaveBlankValidator implements ConstraintValidator<NotHaveBlank, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value != null && value.contains(" ")) {
            // 获取默认的错误提示信息
            String defaultConstraintMessageString = context.getDefaultConstraintMessageTemplate();
            // 禁用默认的错误提示信息
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("can not have blank").addConstraintViolation();
            return false;
        }
        return  false;
    }

}
```
测试
```java
public class Main {
    public static void main(String[] args) {
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Validator validator = context.getBean(Validator.class);

        Set<ConstraintViolation<User>> violations = validator.validate(user);

        if (!violations.isEmpty()) {
            System.out.println("Validation failed");
            violations.forEach(violation -> {
                System.out.println(violation.getMessage());
            });
        } else {
            System.out.println("Validation succeeded");
        }
    }
}
```
## 4. 依赖
```xml
<dependency>
            <!-- https://mvnrepository.com/artifact/org.hibernate.validator/hibernate-validator -->
        <dependency>
            <groupId>org.hibernate.validator</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>8.0.1.Final</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.glassfish/jakarta.el -->
        <dependency>
            <groupId>org.glassfish</groupId>
            <artifactId>jakarta.el</artifactId>
            <version>4.0.2</version>
            <scope>test</scope>
        </dependency>
</dependency>
```