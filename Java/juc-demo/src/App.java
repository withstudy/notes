public class App {
    public static void main(String[] args) throws Exception {
        Thread t1 = new Thread(new Runnable() {
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });

        t1.start();

        System.out.println("Main throws End!");
    }
}
