package com.xhb.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

import com.xhb.pojo.User;

public interface UserMapper {
    
    List<User> queryAllUsers();

    User queryUserByIdName(int id, String name);

    User queryUserByIdNameMap(Map<String, Object> map);

    int insertUser(User user);

    User queryUserByIdNameParam(@Param("id") int id, @Param("name") String name);

    Map<String, Object> queryUserByIdToMap(int id);

    List<Map<String, Object>> queryAllUserToMap();

    @MapKey("id")
    Map<String, Object> queryAllUserToMapByKey();

    List<User> queryUserByBlurName(@Param("name") String name);

    int batchDeleteUser(@Param("ids") String ids);
}   
