package com.xhb.demo.collection;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;

public class SuccessDemo {
    public static void main(String[] args) {
        // Vector方式
        // List<String> list = new Vector<>();
        // Collections.synchronizedList方式
        // List<String> list = Collections.synchronizedList(new ArrayList<>());
        // CopyOnWriteArrayList方式
        List<String> list = new CopyOnWriteArrayList<>();

        // Set集合处理方式
        Set<String> set = new CopyOnWriteArraySet<>();

        // Map集合处理方式
        Map<String, String> map = new ConcurrentHashMap<>();

        for (int i = 0; i < 30; i++) {
            new Thread(() -> {
                list.add(UUID.randomUUID().toString().substring(1, 8));
                System.out.println(list.toString());
            }, String.valueOf(i)).start();
        }
    }
}
