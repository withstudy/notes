import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;

import org.junit.jupiter.api.Test;

public class JDBCTests {

    @Test
    public void testBatch() throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:mysql:///spring-tx?rewriteBatchedStatements=true", "root", "123456");

        PreparedStatement preparedStatement = connection.prepareStatement("insert into t_user (name, blance) values (?, ?)");

        for (int i = 0; i < 10; i++) {
            preparedStatement.setString(1, "xhb" + i);
            preparedStatement.setInt(2, 100 + i);
            preparedStatement.addBatch();
        }
        int[] res = preparedStatement.executeBatch();
        System.out.println(Arrays.toString(res));

        preparedStatement.close();
        connection.close();
    }
}
