package com.xhb.demo.sync;

class Share {
    private int num = 0;

    public synchronized void add() throws InterruptedException {
        while (num != 0) { // 使用while防止虚假唤醒
            this.wait(); // 等待
        }
        num ++;
        System.out.println(Thread.currentThread().getName() + ": :" + num);
        this.notifyAll(); // 通知
    }

    public synchronized void sub() throws InterruptedException {
        while (num != 1) { // 使用while防止虚假唤醒
            this.wait(); // 等待
        }
        num --;
        System.out.println(Thread.currentThread().getName() + ": :" + num);
        this.notifyAll(); // 通知
    }
}

public class ShareDemo {

    public static void main(String[] args) {
        Share share = new Share();

        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    share.add();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "A").start();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                try {
                    share.sub();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "B").start();

    }
}
