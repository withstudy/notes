package com.xhb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import com.mysql.cj.jdbc.Driver;

public class main {
    public static void main(String[] args) throws Exception {
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
    }
}
