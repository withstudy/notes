import java.util.Properties;
import java.sql.Connection;

import org.junit.jupiter.api.Test;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.InputStream;

public class DruidTests {
    @Test
    public void testDruid() throws Exception {
        // 1. 加载配置文件
        Properties properties = new Properties();
    
        // 2. 加载配置文件    
        InputStream in = DruidTests.class.getClassLoader().getResourceAsStream("jdbc.properties");
        properties.load(in);

        // 3. 获取数据库连接池对象
        DruidDataSource dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);

        // 4. 获取数据库连接
        Connection connection = dataSource.getConnection();

        System.out.println(connection);

        // 5. 关闭连接
        connection.close();
    }
}
