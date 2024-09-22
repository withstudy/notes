package com.xhb;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
    private String name;
    private Integer age;
    private Dept dept;
    private String[] loves;

    public void work(){
        System.out.println("Emp work, name:" + name + " age:" + age + " dept:" + dept.name + "loves:" + Arrays.toString(loves));
        if(dept.getUsers() != null){
            dept.getUsers().forEach(user -> System.out.println(user.getName()));
        }
    }
}
