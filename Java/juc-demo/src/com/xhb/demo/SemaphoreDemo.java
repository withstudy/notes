package com.xhb.demo;

import java.util.concurrent.Semaphore;

public class SemaphoreDemo {
    public static void main(String[] args) {
        // 设置许可数量
        Semaphore semaphore = new Semaphore(3);
        for (int i = 0; i < 6; i++) {
            new Thread(() -> {
                try {
                    // 消费许可数量
                    semaphore.acquire();
                    System.out.println(Thread.currentThread().getName() + "Go out");
                    Thread.sleep(3000);
                    System.out.println(Thread.currentThread().getName() + "Back");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    // 释放许可数量
                    semaphore.release();
                }
            }, String.valueOf(i)).start();
        }
    }
}
