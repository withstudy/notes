import org.junit.jupiter.api.Test;

import com.xhb.ProxyFactory;
import com.xhb.bean.Counter;
import com.xhb.bean.CounterImpl;

public class ProxyTests {
    @Test
    public void testProxy() {
        Counter counter = new CounterImpl();
        Counter proxy = (Counter)new ProxyFactory(counter).getProxy();
        proxy.add(1, 2);
    }
}
