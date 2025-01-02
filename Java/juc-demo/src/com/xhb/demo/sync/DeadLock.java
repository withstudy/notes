package com.xhb.demo.sync;

public class DeadLock {
    public static void main(String[] args) {
        Object a = new Object();
        Object b = new Object();
        new Thread(() -> {
            synchronized (a) {
                System.out.println("A");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (b) {
                    System.out.println("B");
                }
            }
        }).start();

        new Thread(() -> {
            synchronized (b) {
                System.out.println("B");
                synchronized (a) {
                    System.out.println("A");
                }
            }
        }).start();
    }
}
