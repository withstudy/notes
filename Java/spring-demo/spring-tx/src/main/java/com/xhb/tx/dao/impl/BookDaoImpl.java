package com.xhb.tx.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.xhb.tx.dao.BookDao;

@Repository
public class BookDaoImpl implements BookDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public Integer getBookPrice(Integer bookId) {
        String sql = "select price from t_book where id = ?";
        Integer price = jdbcTemplate.queryForObject(sql, Integer.class, bookId);
        return price;
    }

    @Override
    public void updateBookStock(Integer bookId) {
        String sql = "update t_book set stock = stock - 1 where id = ?";
        jdbcTemplate.update(sql, bookId);
    }

    @Override
    public void updateUserBanlce(Integer userId, Integer price) {
       String sql = "update t_user set blance = blance - ? where id = ?";
       jdbcTemplate.update(sql, price, userId);
    }

}
