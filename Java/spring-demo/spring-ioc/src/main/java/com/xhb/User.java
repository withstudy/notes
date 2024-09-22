package com.xhb;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String name;

    public void say() {
        System.out.println("Hello User: " + name);
    }
}
