package com.xhb;

import org.junit.jupiter.api.Test;

import com.xhb.mapper.DeptMapper;
import com.xhb.pojo.Dept;
import com.xhb.util.SqlSessionUtil;

public class DeptTests {
    @Test
    public void testFindEmpByDid() {
        DeptMapper mapper = SqlSessionUtil.getMapper(DeptMapper.class);
        Dept dept = mapper.findDeptByIdForEmp(1);
        System.out.println(dept);
    }
}
