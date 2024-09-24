import org.junit.jupiter.api.Test;
import org.springframework.validation.BindingResult;
import org.springframework.validation.DataBinder;

import com.xhb.code.bean.Persion;
import com.xhb.code.validator.PersionValidator;

public class PersionTests {
    @Test
    public void testPersion() {
        Persion persion = new Persion();
        persion.setAge(10);

        DataBinder dataBinder = new DataBinder(persion);

        dataBinder.setValidator(new PersionValidator());

        dataBinder.validate();

        BindingResult result = dataBinder.getBindingResult();

        System.out.println(result.hasErrors());
        System.out.println(result.toString());
    }
}
