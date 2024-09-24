import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.xhb.anno.bean.User;
import com.xhb.anno.config.MyConfig;
import com.xhb.anno.validation.UserValitation;

@SpringJUnitConfig(MyConfig.class)
public class UserCustomTests {

    @Autowired
    private User user;

     @Autowired
    private UserValitation userValitation;

    @Test
    public void testUserCustom() {
        user.setName("xhb");
        user.setAge(10);
        user.setDescription("ni hao");
        boolean hasErrors = userValitation.validateUserDesc(user);
        System.out.println(hasErrors);
    }
}
