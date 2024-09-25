package com.xhb;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.List;
import java.util.ArrayList;

public class BaseDao {

    public Integer executeUpdate(String sql, Object... params) throws Exception {
        Connection connection = JDBCUtil.getConnection();
        PreparedStatement preparedStatement = null;
        preparedStatement = connection.prepareStatement(sql);
        if (params != null && params.length > 0) {
            for (int i = 0; i < params.length; i++) {
                preparedStatement.setObject(i + 1, params[i]);
            }
        }
        Integer res = preparedStatement.executeUpdate();
        preparedStatement.close();
        JDBCUtil.release();
        return res;
    }

    public Integer executeUpdateTransaction(String sql, Object... params) throws Exception {
        Connection connection = JDBCUtil.getConnection();
        connection.setAutoCommit(false);
        PreparedStatement preparedStatement = null;
        preparedStatement = connection.prepareStatement(sql);
        if (params != null && params.length > 0) {
            for (int i = 0; i < params.length; i++) {
                preparedStatement.setObject(i + 1, params[i]);
            }
        }
        Integer res = preparedStatement.executeUpdate();
        preparedStatement.close();
        JDBCUtil.release();
        return res;
    }

    public <T> List<T> executeQuery(Class<T> clazz, String sql, Object... params) throws Exception {
        Connection connection = JDBCUtil.getConnection();
        PreparedStatement preparedStatement = null;
        preparedStatement = connection.prepareStatement(sql);
        if (params != null && params.length > 0) {
            for (int i = 0; i < params.length; i++) {
                preparedStatement.setObject(i + 1, params[i]);
            }
        }
        ResultSet resultSet = preparedStatement.executeQuery();
        // 获取元数据
        ResultSetMetaData metaData = resultSet.getMetaData();
        // 获取列数
        Integer columnCount = metaData.getColumnCount();
        List<T> res = new ArrayList<>();
        while (resultSet.next()) {
            T t = clazz.newInstance();

            for (int i = 1; i < columnCount; i++) {
                // 获取列名
                String columnName = metaData.getColumnName(i);
                // 获取属性对象
                Field field = clazz.getDeclaredField(columnName);
                // 跳过private
                field.setAccessible(true);
                // 设置属性值
                field.set(t, resultSet.getObject(columnName));
            }
            res.add(t);
        }
        preparedStatement.close();
        JDBCUtil.release();
        return res;
    }

    public <T> T executeQueryBean(Class<T> clazz, String sql, Object... params) throws Exception {
        List<T> list = executeQuery(clazz, sql, params);
        if (list != null && list.size() > 0) {
            return list.get(0);
        }
        return null;
    }
}
