package com.xhb.mapper;

import java.util.List;

import com.xhb.pojo.Emp;

public interface EmpMapper {
    //查询所有员工
    List<Emp> findAllEmp();

    List<Emp> findAllEmpStep();
}
