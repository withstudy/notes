package com.xhb.util;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlSessionUtil {
    private static SqlSession sqlSession;
    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            // 1.获取sqlSessionFactory
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            // 2.获取sqlSession
            sqlSession = sqlSessionFactory.openSession(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static <T> T getMapper(Class<T> clazz) {
        return sqlSession.getMapper(clazz);
    }
}
