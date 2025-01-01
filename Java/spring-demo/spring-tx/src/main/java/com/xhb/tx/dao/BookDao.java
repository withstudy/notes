package com.xhb.tx.dao;

public interface BookDao {

    public Integer getBookPrice(Integer bookId);

    public void updateBookStock(Integer bookId);

    public void updateUserBanlce(Integer userId, Integer price);
}
