package com.xhb.tx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhb.tx.dao.BookDao;
import com.xhb.tx.service.BookService;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookDao bookDao;

    // 事务管理
    @Transactional
    @Override
    public void buyBook(Integer userId, Integer bookId) {
        // 1 获取图书价格
        Integer price = bookDao.getBookPrice(bookId);
        // 2 更新图书库存-1
        bookDao.updateBookStock(bookId);

        // 3 更新用户余额-图书价格
        bookDao.updateUserBanlce(userId, price);
    }

}
