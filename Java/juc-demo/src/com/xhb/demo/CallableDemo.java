package com.xhb.demo;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("MyCeallable Call");

        return 200;
    }
}

public class CallableDemo {
    public static void main(String[] args) {
        FutureTask<Integer> task = new FutureTask<>(new MyCallable());

        new Thread(task).start();

        try {
            Object o = task.get();
            System.out.println("res=" + o);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
