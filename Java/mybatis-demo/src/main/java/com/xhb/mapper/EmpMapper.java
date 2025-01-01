package com.xhb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xhb.pojo.Emp;

public interface EmpMapper {
    //查询所有员工
    List<Emp> findAllEmp();

    List<Emp> findAllEmpStep();

    List<Emp> findEmpByDid(@Param("did") int did);
}
