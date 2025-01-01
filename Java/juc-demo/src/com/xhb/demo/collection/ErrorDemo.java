package com.xhb.demo.collection;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ErrorDemo {
    public static void main(String[] args) {
        List<String> arr = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            new Thread(() -> {
                arr.add(UUID.randomUUID().toString().substring(1, 8));
                System.out.println(arr.toString());
            }, String.valueOf(i)).start();
        }
    }
}
