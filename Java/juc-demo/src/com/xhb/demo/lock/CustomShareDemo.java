package com.xhb.demo.lock;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class Share {
    private int flag = 1;

    private final ReentrantLock lock = new ReentrantLock();
    private Condition condition1 = lock.newCondition();
    private Condition condition2 = lock.newCondition();
    private Condition condition3 = lock.newCondition();
    

    public void print1(int loop) {
        lock.lock();
        try {
            while (flag != 1) {
                condition1.await();
            }
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            flag = 2;
            condition2.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public void print2(int loop) {
        lock.lock();
        try {
            while (flag != 2) {
                condition2.await();
            }
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            flag = 3;
            condition3.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public void print3(int loop) {
        lock.lock();
        try {
            while (flag != 3) {
                condition3.await();
            }
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            System.out.println(Thread.currentThread().getName() + "::" + flag + "::" + loop);
            flag = 1;
            condition1.signalAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}

public class CustomShareDemo {

    public static void main(String[] args) {
        Share share = new Share();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                share.print1(i);
            }
        }, "A").start();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                share.print2(i);
            }
        }, "B").start();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                share.print3(i);
            }
        }, "C").start();
    }
}
