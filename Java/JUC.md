
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

## 四、集合线程安全

当多个线程访问和操作集合时，会产生报错

```java
ArrayList<String> arr = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            new Thread(() -> {
                arr.add(UUID.randomUUID().toString().substring(1, 8));
                System.out.println(arr.toString());
            }, String.valueOf(i)).start();
        }
```

### 1.Vector

Vector是线程安全的，但是效率低。
```java
List<String> list = new Vector<>();
```

### 2.Collections

Collections是Java提供的一个工具类，它提供了多个方法来保证集合的线程安全。

```java
List<String> list = Collections.synchronizedList(new ArrayList<>());
```

### 3.CopyOnWriteArrayList

### 4.CopyOnWriteArraySet

### 5.ConcurrentHashMap

## 五、多线程锁

### 1.Synchronized关键字

* 对于普通同步方法，锁是当前实例对象。
* 对于静态同步方法，锁是当前类的Class对象。
* 对于同步方法块，锁是Synchonized括号里配置的对象。

### 2.公平锁和非公平锁

* 公平锁： 线程按照申请锁的顺序来获取锁。效率低。
* 非公平锁： 线程获取锁的顺序并不是按照申请锁的顺序，有可能后申请的线程比先申请的线程优先获取锁。效率高。

```java
// true 表示公平锁，false 表示非公平锁
Lock lock = new ReentrantLock(true);
```

### 3.可重入锁

可重入锁是指在同一个线程内，外层函数获得锁之后，内层递归函数仍然能获取该锁的代码，在同一个线程在外层方法获取锁的时候，在进入内层方法会自动获取锁。 

Synchronized和ReentrantLock都是可重入锁。

```java
public class Test {
    private Lock lock = new ReentrantLock();
    public void test() {
        lock.lock();
        try {
            System.out.println("test");
            test1();
        } finally {
            lock.unlock();
        }
    }
    public void test1() {
        lock.lock();
        try {
            System.out.println("test1");
        } finally {
            lock.unlock();
        }
    }
}
```

### 4.死锁

死锁是指两个或两个以上的进程在执行过程中，由于`竞争资源`或者由于`彼此通信`而造成的一种阻塞的现象，若无外力作用，它们都将无法推进下去。

此时称系统处于死锁状态或系统产生了死锁，这些永远在互相等待的进程称为死锁进程。

```java
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

```

#### 验证死锁

* jps： 查看进程，`jps -l` 查看死锁进程的pid
* jstack： 查看进程的线程信息, `jstack <pid>` 查看死锁进程的线程信息