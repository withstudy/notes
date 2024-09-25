# JDBC

## 1. 概述

什么是JDBC？

JDBC（Java Database Connectivity）是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法。JDBC也是Java平台对关系数据库进行访问的标准API。

JDBC是Java访问数据库的标准API，它由一组用Java语言编写的类和接口组成。通过JDBC，Java应用程序可以与任何符合JDBC规范的数据库进行交互，从而实现数据的访问和操作。

JDBC的主要功能包括：

1. 连接数据库：JDBC提供了连接数据库的方法，可以通过JDBC驱动程序与数据库建立连接。
2. 执行SQL语句：JDBC提供了执行SQL语句的方法，可以执行查询、插入、更新和删除等操作。
3. 处理结果集：JDBC提供了处理查询结果的方法，可以将查询结果存储在ResultSet对象中，并对其进行遍历和处理。
4. 管理事务：JDBC提供了管理事务的方法，可以提交或回滚事务。
5. 处理异常：JDBC提供了处理数据库访问异常的方法，可以捕获和处理数据库访问错误。
6. 连接池：JDBC提供了连接池的功能，可以管理数据库连接，提高数据库访问的性能。
7. 数据类型转换：JDBC提供了数据类型转换的方法，可以将Java数据类型转换为数据库数据类型，反之亦然。

## 2. 相关对象及作用

JDBC中常用的对象有：

1. DriverManager：用于管理数据库连接的类，可以创建数据库连接。
2. Connection：表示与数据库的连接，可以执行SQL语句和事务操作。
3. Statement：用于执行SQL语句的对象，可以执行查询、插入、更新和删除等操作。
4. PreparedStatement：继承自Statement，用于执行预编译的SQL语句，可以提高执行效率。
5. ResultSet：用于存储查询结果的对象，可以通过遍历ResultSet对象来获取查询结果。

```java
        // 注册驱动
        // jdk 6 之后可以不写注册驱动
        // Class.forName("com.mysql.cj.jdbc.Driver");
        // DriverManager.registerDriver(new Driver());

        String url = "jdbc:mysql://localhost:3306/spring-tx";
        String username = "root";
        String password = "123456";
        // 获取连接
        Connection connection = DriverManager.getConnection(url, username, password);
        // 获取执行sql的对象
        // Statement statement = connection.createStatement();
        PreparedStatement preparedStatement = connection.prepareStatement("select * from t_user where id = ?");

        String sql = "select * from t_user";
        // 执行sql
        // ResultSet resultSet = statement.executeQuery(sql);
        preparedStatement.setInt(1, 1);
        ResultSet resultSet = preparedStatement.executeQuery(sql);
        while (resultSet.next()) {
            String name = resultSet.getString("name");
            Integer blance = resultSet.getInt("blance");
            System.out.println(name + " " + blance);
        }

        // statement.close();
        preparedStatement.close();
        connection.close();
```

## 3. 连接池

连接池是一种用于管理数据库连接的技术，可以提高数据库访问的性能和可靠性。连接池通过预先创建一定数量的数据库连接，并在需要时将这些连接分配给应用程序，从而避免了频繁地创建和销毁数据库连接的开销。

连接池的主要作用包括：

1. 提高数据库访问的性能：连接池可以预先创建一定数量的数据库连接，并在需要时将这些连接分配给应用程序，从而避免了频繁地创建和销毁数据库连接的开销，提高了数据库访问的性能。
2. 提高数据库访问的可靠性：连接池可以管理数据库连接，确保数据库连接的可用性和稳定性，避免了数据库连接的异常和错误，提高了数据库访问的可靠性。
3. 资源共享：连接池可以共享数据库连接，避免了重复创建和销毁数据库连接的开销，提高了资源的利用率。
4. 负载均衡：连接池可以分配数据库连接给多个应用程序，实现了负载均衡，提高了系统的并发处理能力。
5. 连接管理：连接池可以管理数据库连接，包括连接的创建、销毁、分配和回收等操作，提高了数据库连接的管理效率。
6. 连接监控：连接池可以监控数据库连接的状态，包括连接的数量、使用情况等，为数据库连接的优化和调整提供了依据。

### 1.常见连接池库

1. DBCP：Apache Commons DBCP是一个开源的数据库连接池实现，支持多种数据库和JDBC驱动程序。
2. C3P0：C3P0是一个开源的数据库连接池实现，支持多种数据库和JDBC驱动程序。
3. Tomcat JDBC Pool：Tomcat JDBC Pool是Tomcat服务器自带的数据库连接池实现，支持多种数据库和JDBC驱动程序。
4. **HikariCP：HikariCP是一个高性能的数据库连接池实现，支持多种数据库和JDBC驱动程序。**
5. **Druid：Druid是一个开源的数据库连接池实现，支持多种数据库和JDBC驱动程序，具有丰富的功能和性能优化。**

#### Druid

Druid是一个开源的数据库连接池实现，支持多种数据库和JDBC驱动程序，具有丰富的功能和性能优化。Druid具有以下特点：

1. 高性能：Druid具有高性能的数据库连接池实现，可以支持高并发和高负载的数据库访问。
2. 功能丰富：Druid具有丰富的功能和性能优化，包括连接池管理、连接监控、SQL解析和优化、数据库连接池的配置等。
3. 易于使用：Druid具有易于使用的API和配置文件，可以快速地集成到应用程序中。
4. 稳定性：Druid具有稳定的数据库连接池实现，可以确保数据库连接的可用性和稳定性。
5. 安全性：Druid具有丰富的安全功能和性能优化，包括SQL注入防护、数据库连接池的加密和认证等。
6. 扩展性：Druid具有良好的扩展性，可以支持多种数据库和JDBC驱动程序，并且可以自定义连接池的实现。

例子：

```java
public class DruidDemo {
    public static void main(String[] args) throws SQLException {
        // 创建Druid连接池
        // DruidDataSource dataSource = new DruidDataSource();
        // dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        // dataSource.setUsername("root");
        // dataSource.setPassword("123456");

        // 1. 加载配置文件
        Properties properties = new Properties();
        // 2. 加载配置文件    
        InputStream in = DruidTests.class.getResourceAsStream("jdbc.properties");
        properties.load(in);
        // 3. 获取数据库连接池对象
        DruidDataSource dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);

        // 从连接池获取连接
        Connection connection = dataSource.getConnection();

        // 创建PreparedStatement
        String sql = "SELECT * FROM user WHERE id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        // 设置参数
        preparedStatement.setInt(1, 1);

        // 执行查询
        ResultSet resultSet = preparedStatement.executeQuery();

        // 处理结果集
        while (resultSet.next()) {
            String name = resultSet.getString("name");
            Integer age = resultSet.getInt("age");
            System.out.println(name + " " + age);
        }

        // 关闭连接
        resultSet.close();
        preparedStatement.close();
        connection.close();
    }
}
```

## 4. 事务

事务是数据库操作的基本单位，它是一组逻辑上相关的一组操作，这些操作要么全部成功，要么全部失败。事务具有原子性、一致性、隔离性和持久性（ACID）的特性。

在Java中，可以使用JDBC来操作数据库事务。以下是一个使用JDBC操作数据库事务的示例：

```java
public class TransactionDemo {
    public static void main(String[] args) throws SQLException {
        // 获取数据库连接
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "123456");

        // 开启事务
        connection.setAutoCommit(false);

        // 执行SQL语句
        try {
            String sql1 = "UPDATE user SET name = 'Tom' WHERE id = 1";
            String sql2 = "UPDATE user SET age = 20 WHERE id = 1";
            Statement statement = connection.createStatement();
            statement.executeUpdate(sql1);
            statement.executeUpdate(sql2);
            // 提交事务
            connection.commit();
        } catch (SQLException e) {
            // 发生异常，回滚事务
            connection.rollback();
            e.printStackTrace();
        }
        // 关闭连接
        statement.close();
        connection.close();
    }
}
```
