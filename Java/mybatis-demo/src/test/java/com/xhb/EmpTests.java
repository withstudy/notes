package com.xhb;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.xhb.mapper.EmpMapper;
import com.xhb.pojo.Emp;
import com.xhb.util.SqlSessionUtil;

public class EmpTests {
    @Test
    public void testFindAllEmp() {
        EmpMapper mapper = SqlSessionUtil.getMapper(EmpMapper.class);
        List<Emp> emps = mapper.findAllEmp();
        System.out.println(emps);
    }

    @Test
    public void testFindAllEmpStep() {
        EmpMapper mapper = SqlSessionUtil.getMapper(EmpMapper.class);
        List<Emp> emps = mapper.findAllEmpStep();
        System.out.println(emps);
    }
}
