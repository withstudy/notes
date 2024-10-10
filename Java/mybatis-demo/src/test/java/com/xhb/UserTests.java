package com.xhb;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;

import com.xhb.mapper.UserMapper;
import com.xhb.pojo.User;
import com.xhb.util.SqlSessionUtil;

public class UserTests {

    @Test
    public void testUesrSelect() throws IOException {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        List<User> users = mapper.queryAllUsers();
        System.out.println(users);
    }

    @Test
    public void testUesrSelectByIdName() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        User user = mapper.queryUserByIdName(1, "xhb");
        System.out.println(user);
    }

    @Test
    public void testUesrSelectByIdNameMap() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("id", 1);
        map.put("name", "xhb");
        User user = mapper.queryUserByIdNameMap(map);
        System.out.println(user);
    }

    @Test
    public void testInsertUser() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        User user = new User();
        user.setName("xhbsb");
        user.setBlance(18);
        mapper.insertUser(user);
    }

    @Test
    public void testUesrSelectByIdNameParam() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        User user = mapper.queryUserByIdNameParam(1, "xhb");
        System.out.println(user);
    }

    @Test
    public void testUesrSelectByIdToMap() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        Map<String, Object> map = mapper.queryUserByIdToMap(1);
        System.out.println(map);
    }

    @Test
    public void testUesrSelectAllToMap() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        List<Map<String, Object>> map = mapper.queryAllUserToMap();
        System.out.println(map);
    }

    @Test
    public void testUesrSelectAllToMapByKey() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        Map<String, Object> map = mapper.queryAllUserToMapByKey();
        System.out.println(map);
    }

    @Test 
    public void testQueryUserByBlurName() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        List<User> users = mapper.queryUserByBlurName("2");
        System.out.println(users);
    }

    @Test 
    public void testBatchDeleteUser() {
        UserMapper mapper = SqlSessionUtil.getMapper(UserMapper.class);
        int res = mapper.batchDeleteUser("1, 2, 3");
        System.out.println(res);
    }
}
