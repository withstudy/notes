package com.xhb.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Emp {
    private Integer eid;
    private String empName;
    private Integer age;
    private String sex;
    private Dept dept;
}
