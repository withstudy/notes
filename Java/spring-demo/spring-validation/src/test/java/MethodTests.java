import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.xhb.anno.bean.User;
import com.xhb.anno.config.MyConfig;
import com.xhb.anno.service.MethodService;

@SpringJUnitConfig(MyConfig.class)
public class MethodTests {

    @Autowired
    private MethodService methodService;

    @Autowired
    private User user;

    // 基于方法的校验
    @Test
    public void testMethodValidation() {
        user.setAge(10);
        // user.setName("xhb");
        user.setDescription("i ma ok");
        String res = methodService.testMethodValidation(user);
        System.out.println(res);
    }

}
