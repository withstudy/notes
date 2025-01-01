package com.xhb.demo.lock;

import java.util.concurrent.locks.ReentrantLock;

class Ticket {

    private int num = 30;

    // 重入锁
    private final ReentrantLock lock = new ReentrantLock();

    public synchronized void sale() {
        lock.lock();
        try {
            if (num > 0) {
                System.out.println(Thread.currentThread().getName() + "卖出第" + num-- + "张票，剩余" + num + "张");
            }
        } finally {
            lock.unlock();
        }
    }
    
}

public class LockDemo {

    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        new Thread(() -> {
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "AA").start();
        new Thread(() -> {
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "BB").start();
        new Thread(() -> {
            for (int i = 0; i < 40; i++) {
                ticket.sale();
            }
        }, "CC").start();
    }

}
