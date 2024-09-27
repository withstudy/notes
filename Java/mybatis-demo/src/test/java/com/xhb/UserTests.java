package com.xhb;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;

import com.xhb.mapper.UserMapper;
import com.xhb.pojo.User;

public class UserTests {

    @Test
    public void testUesrSelect() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        // 1.获取sqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        // 2.获取sqlSession
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        // 3.获取mapper接口的代理对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        // 4.执行方法
        List<User> users = mapper.queryAllUsers();
        System.out.println(users);
        // 5.释放资源
        sqlSession.close();
    }
}
