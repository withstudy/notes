import org.junit.jupiter.api.Test;

import com.xhb.BaseDao;
import com.xhb.User;
import java.util.List;

public class BaseDaoTests {
    @Test
    public void testBaseDao() throws Exception {
        BaseDao baseDao = new BaseDao();
        Integer res = baseDao.executeUpdate("insert into t_user (name,blance) values (?,?)", "xcl", 18);
        System.out.println(res);
    }

    @Test
    public void testQuery() throws Exception {
        BaseDao baseDao = new BaseDao();
        List<User> res = baseDao.executeQuery(User.class, "select * from t_user");
        System.out.println(res.toString());
    }

    @Test
    public void testQueryBean() throws Exception {
        BaseDao baseDao = new BaseDao();
        User res = baseDao.executeQueryBean(User.class, "select * from t_user where id = ?", 1);
        System.out.println(res.toString());
    }
}
