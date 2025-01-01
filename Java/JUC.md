
# JUC

JUC是指java.util.concurrent包，是java并发编程的工具包。

## 一、概述

### 1.进程与线程

进程是系统分配资源的最小单位，线程是系统调度的最小单位。

### 2.线程的状态

* new： 新建状态
* runnable： 就绪状态
* blocked： 阻塞状态
* waiting： 等待状态
* timed_waiting： 超时等待状态
* terminated： 终止状态

### 3.wait和sleep的区别

* wait是Object的方法，sleep是Thread的方法
* wait会释放锁，sleep不会释放锁

### 4.并行和并发的区别

* 并行是指多个任务同时执行，并发是指多个任务交替执行

### 5.管程

管程作用是jvm中控制离开线程和进入线程的对象。

### 6.用户线程和守护线程

* 用户线程： 当一个进程不包含任何的存活的用户线程时，进程结束。
* 守护线程： 守护用户线程的，当最后一个用户线程结束时，所有守护线程自动死亡。

## 二、Lock接口

### 1.synchronized

synchronized的作用是保证原子性、可见性、有序性。上锁和解锁都是自动的。

* 修饰方法

```java
public synchronized void test() {
    System.out.println("test");
}
```

* 修饰代码块

```java
public void test() {
    synchronized (this) {
        System.out.println("test");
    }
}
```

* 修饰静态方法

```java
public static synchronized void test() {
    System.out.println("test");
}
```

* 修饰类

```java
public class Test {
    public void test() {
        synchronized (Test.class) {
            System.out.println("test");
        }
    }
}
```

### 2.ReentrantLock

ReentrantLock是Lock的实现类，它的作用是保证原子性、可见性、有序性。上锁和解锁都是手动的。

```java
public class Test {
    private Lock lock = new ReentrantLock();
    public void test() {
        lock.lock();
        try {
            System.out.println("test");
        } finally {
            lock.unlock();
        }
    }
}
```

## 三、线程通信

### 1.wait和notify

wait和notify是Object的方法，用于线程间的通信。

* wait： 线程进入等待状态，并释放锁。
* notify： 唤醒一个等待的线程。

```java
public class Test {
    private Object lock = new Object();
    public void test() {
        synchronized (lock) {
            try {
                lock.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 2.Condition

Condition是Lock的实现类，它的作用是保证原子性、可见性、有序性。上锁和解锁都是手动的。

* await： 线程进入等待状态，并释放锁。
* signal： 唤醒一个等待的线程。

```java
public class Test {
    private Lock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();
    public void test() {
        lock.lock();
        try {
            condition.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}
```

