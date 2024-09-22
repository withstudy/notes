import org.junit.jupiter.api.Test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.xhb.bean.Counter;
import com.xhb.bean.CounterImpl;
import com.xhb.config.MySpringConfig;

public class AopTests {
    @Test
    public void testAspect() {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(MySpringConfig.class);
        Counter counter = (Counter)ctx.getBean("counterImpl");
        counter.add(1, 2);
        // counter.sub(1, 2);
    }
}
