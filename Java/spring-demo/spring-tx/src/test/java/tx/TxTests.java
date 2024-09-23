package tx;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.xhb.tx.controller.BookController;

@SpringJUnitConfig(locations = "classpath:bean-tx.xml")
public class TxTests {

    @Autowired
    private BookController bookController;

    @Test
    public void testTX() {
        bookController.buyBook(1, 1);
    }
}
