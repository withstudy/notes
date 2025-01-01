package tx;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.xhb.tx.config.MySpringConfig;
import com.xhb.tx.controller.BookController;

public class AnnoTxTests {

    // 全注解
    @Test
    public void testAnnoTX() {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MySpringConfig.class);
        BookController bookController = (BookController)ctx.getBean("bookController");
        bookController.buyBook(1, 1);
    }
}
