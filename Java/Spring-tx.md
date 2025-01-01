# 事务

## 事务的原则

- 原子性（Atomicity）：事务是一个不可分割的工作单位，事务中的操作要么全部完成，要么全部不完成，不可能只执行一部分。
- 一致性（Consistency）：事务必须使数据库从一个一致性状态变换到另一个一致性状态。
- 隔离性（Isolation）：多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。
- 持久性（Durability）：一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。

## 事务的传播行为

事务的传播行为用来解决业务层方法之间互相调用的事务问题。

| 传播行为       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| REQUIRED       | 当前有事务，加入当前事务；当前没有事务，新建一个事务          |
| REQUIRES_NEW   | 当前有事务，挂起当前事务，新建一个事务；当前没有事务，新建一个事务 |
| SUPPORTS       | 当前有事务，加入当前事务；当前没有事务，不新建事务，以非事务方式运行 |
| NOT_SUPPORTED  | 当前有事务，挂起当前事务；当前没有事务，不新建事务，以非事务方式运行 |
| MANDATORY      | 当前有事务，加入当前事务；当前没有事务，抛出异常              |
| NEVER          | 当前有事务，抛出异常；当前没有事务，不新建事务，以非事务方式运行 |
| NESTED         | 当前有事务，新建一个事务，嵌套调用；当前没有事务，新建一个事务 |

## 事务的隔离级别

- 脏读：一个事务读取了另一个事务未提交的数据。
- 不可重复读：一个事务读取了另一个事务已经提交的update数据。
- 幻读：一个事务读取了另一个事务已经提交的insert数据。

| 隔离级别       | 脏读 | 不可重复读 | 幻读 |
| -------------- | ---- | ---------- | ---- |
| READ_UNCOMMITED | √    | √          | √    |
| READ_COMMITED   | ×    | √          | √    |
| REPEATABLE_READ | ×    | ×          | √    |
| SERIALIZABLE    | ×    | ×          | ×    |

## 新增依赖

```xml
    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>6.1.12</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.8</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
    </dependencies>
```

## 事务的配置

### 1. 声明式事务

#### 1.1 基于注解

```xml
<bean name="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/test"/>
    <property name="username" value="root"/>
    <property name="password" value="123456
"/>
</bean>
<bean name="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"/>
</bean>
<!-- 配置事务管理器 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<!-- 配置事务注解驱动 -->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

#### 1.2 基于XML

1. 配置事务管理器

```xml
<bean name="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/test"/>
    <property name="username" value="root"/>
    <property name="password" value="123456
"/>
</bean>
<!-- 配置事务管理器 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

2. 配置事务通知

```xml
<!-- 配置事务通知 -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="transfer" propagation="REQUIRED"/>
    </tx:attributes>
</tx:advice>
```

3. 配置AOP

```xml
<!-- 配置AOP -->
<aop:config>
    <aop:pointcut id="pointcut" expression="execution(* com.itheima.service.impl.*.*(..))"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="pointcut"/>
</aop:config>
```

### 1.3 基于配置类

```java
@Configuration
@ComponentScan("com.itheima")
@EnableTransactionManagement
public class SpringConfig {
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

###  使用

```java
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    // @Transactional(readOnly = true) 只读
    // @Transactional(propagation = Propagation.SUPPORTS) 传播行为
    // @Transactional(timeout = 3) 超时时间
    // @Transactional(isolation = Isolation.DEFAULT) 隔离级别
    // @Transactional(noRollbackFor = ArithmeticException.class) 不回滚
    // @Transactional(rollbackFor = ArithmeticException.class) 回滚
    @Transactional
    @Override
    public void transfer(String out, String in, Double money) {
        userDao.outMoney(out, money);
        userDao.inMoney(in, money);
    }
}
```