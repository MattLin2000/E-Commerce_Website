package com.example.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Order;
import com.example.demo.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order,String>{
   Order findByOrderId(String id);
   Order findByUser(User user);
   Page<Order> findAllByUser(User user, PageRequest pageable);
}
