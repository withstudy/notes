package jdbc;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.xhb.jdbc.User;

// spring junit 测试
@SpringJUnitConfig(locations = "classpath:bean.xml")
public class JdbcTests {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 创建
    @Test
    public void testCreate() {
        String sql = "insert into user values(null, ?, ?)";
        Integer res = jdbcTemplate.update(sql, "xhb", "xhb123456");
        System.out.println(res);
    }
    // 删除
    @Test
    public void testDelete() {
        String sql = "delete from user where id = ?";
        Integer res = jdbcTemplate.update(sql, 1);
        System.out.println(res);
    }
    // 修改
    @Test
    public void testUpdate() {
        String sql = "update user set password = ? where id = ?";
        Integer res = jdbcTemplate.update(sql, "xhb12345678", 2);
        System.out.println(res);
    }
    // 查询 自定义
    @Test
    public void testSelectObject() {
        String sql = "select * from user where id = ?";
        User user = jdbcTemplate.queryForObject(sql, (res, rowNum) -> {
            User u = new User();
            u.setId(res.getInt("id"));
            u.setUsername(res.getString("username"));
            u.setPassword(res.getString("password"));
            return u;
        }, 2);
        System.out.println(user);
    }
    // 查询 BeanPropertyRowMapper
    @Test
    public void testSelectObject2() {
        String sql = "select * from user where id = ?";
        User user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(User.class), 2);
        System.out.println(user);
    }
    // 查询 List
    @Test
    public void testSelectList() {
        String sql = "select * from user";
        List<User> users = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class));
        System.out.println(users);
    }
    // 查询 单个值
    @Test
    public void testValue() {
        String sql = "select count(*) from user";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        System.out.println(count);
    }
}
