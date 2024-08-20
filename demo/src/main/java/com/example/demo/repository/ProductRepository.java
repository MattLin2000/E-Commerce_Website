package com.example.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    //關鍵字搜索
     Page<Product> findByNameContaining(@Param("keyword") String keyword,PageRequest pageable);
}
