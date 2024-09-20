package com.xhb;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dept {
    public String name;
    private List<Emp> users;

    public void desc() {
        System.out.println("部门名称：" + name);
    }
}
