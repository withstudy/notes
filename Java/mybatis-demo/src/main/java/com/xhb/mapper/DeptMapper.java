package com.xhb.mapper;

import org.apache.ibatis.annotations.Param;

import com.xhb.pojo.Dept;

public interface DeptMapper {
    
    Dept findDeptById(@Param("did") int did);
}
