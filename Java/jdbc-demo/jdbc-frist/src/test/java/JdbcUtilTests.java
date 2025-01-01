import java.sql.Connection;

import org.junit.jupiter.api.Test;

import com.xhb.JDBCUtil;

public class JdbcUtilTests {

    @Test
    public void testJdbcUtil() {
        Connection connection1 = JDBCUtil.getConnection();
        Connection connection2 = JDBCUtil.getConnection();
        Connection connection3 = JDBCUtil.getConnection();

        System.out.println(connection1);
        System.out.println(connection2);
        System.out.println(connection3);
    }
}
