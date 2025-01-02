
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

### 6.创建线程的方式

* 继承Thread类

```java
public class Test extends Thread {
    @Override
    public void run() {
        System.out.println("test");
    }
}
// 创建线程
new Test().start();
```

* 实现Runnable接口

```java
public class Test implements Runnable {
    @Override
    public void run() {
        System.out.println("test");
    }
}
// 创建线程
new Thread(new Test(), "A").start();
```

* 实现Callable接口

* 线程池

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

### 5.Callable接口

Callable接口是一个泛型接口，它的作用是可以有返回值，并且可以抛出异常。

```java
public class Test implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "test";
    }
}

// 创建线程
FutureTask<String> futureTask = new FutureTask<>(new Test());
new Thread(futureTask, "A").start();
// 获取返回值
String result = futureTask.get();
```

### 6.辅助类

#### CountDownLatch

CountDownLatch是一个计数器，它的作用是让线程等待，直到计数器变为0。

```java
public class Test {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(6);
        for (int i = 0; i < 6; i++) {
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "Go out");
                countDownLatch.countDown();
            }, String.valueOf(i)).start();
        }
        countDownLatch.await();
        // countDownLatch等于0，才会执行下面的代码
        System.out.println("Close door");
    }
}
```

#### CyclicBarrier

CyclicBarrier是一个计数器，它的作用是让线程等待，直到计数器变为0。

```java
public class Test {
    public static void main(String[] args) {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(7, () -> {
            System.out.println("召唤神龙");
        });
        for (int i = 0; i < 7; i++) {
            final int temp = i;
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "收集" + temp + "龙珠");
                try {
                    cyclicBarrier.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }
    }
}
```

#### Semaphore

Semaphore是一个计数器，它的作用是控制线程的并发数。

```java
public class Test {
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
```

### 7.读写锁

#### 悲观锁\乐观锁

悲观锁针对数据操作只要加锁，其他线程都不能操作。只有解锁后，其他线程才能操作。

乐观锁每个线程都可以操作数据，但是在操作数据时，会检查数据是否被修改。

乐观锁的实现方式有两种：

* 版本号： 每次操作数据时，都会将版本号加1。在操作数据时，会检查版本号是否被修改。
* CAS： 比较并交换。在操作数据时，会比较数据是否被修改。

#### 共享锁\排他锁

共享锁是指多个线程可以同时读取数据。

`ReentrantReadWriteLock`是一个共享锁。

排他锁是指多个线程只能一个线程读取数据。

`Synchronized`和`ReentrantLock`都是悲观锁。

#### 表锁\行锁

表锁是指对整张表加锁。

表锁会发生死锁。

行锁是指对一行数据加锁。

#### 读锁\写锁

读锁又称为共享锁。会发生死锁。

写锁又称为排他锁、独占锁。会发生死锁。

使用`ReentrantReadWriteLock`实现读写锁。

> 读是共享的，可以多个线程同时读取数据，但是写是独占的，只能一个线程写入数据。
> 并且只有读完才能写。

```java
public class Test {
    private ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private Lock readLock = lock.readLock();
    private Lock writeLock = lock.writeLock();
    public void read() {
        readLock.lock();
        try {
            System.out.println("read");
        } finally {
            readLock.unlock();
        }
    }
    public void write() {
        writeLock.lock();
        try {
            System.out.println("write");
        } finally {
            writeLock.unlock();
        }
    }
}
```

写锁可以降级为读锁。但是读锁不能升级为写锁。

降级过程：先获取写锁，再获取读锁，然后释放写锁，最后释放读锁。

```java
public class Test {
    private ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private Lock readLock = lock.readLock();
    private Lock writeLock = lock.writeLock();
    public void read() {
        readLock.lock();
        try {
            System.out.println("read");
            writeLock.lock();
            try {
                System.out.println("write");
            } finally {
                writeLock.unlock();
            }
        } finally {
            readLock.unlock();
        }
    }
}