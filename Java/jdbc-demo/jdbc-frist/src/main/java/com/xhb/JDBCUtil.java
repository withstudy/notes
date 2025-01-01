package com.xhb;

import javax.sql.DataSource;
import java.sql.Connection;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.util.Properties;

public class JDBCUtil {

    private static DataSource dataSource;
    // 同线程共享一个连接
    private static ThreadLocal<Connection> threadLocal = new ThreadLocal<>();

    static {
        try {
            Properties properties = new Properties();
            properties.load(JDBCUtil.class.getClassLoader().getResourceAsStream("jdbc.properties"));
            dataSource = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        };
    }

    public static Connection getConnection() {
        try {
            Connection connection = threadLocal.get();
            if(connection == null) {
                connection = dataSource.getConnection();
                threadLocal.set(connection);
            }
            return connection;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public static void release() {
        try {
            Connection connection = threadLocal.get();
            if (connection != null) {
                connection.close();
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
    }
}
