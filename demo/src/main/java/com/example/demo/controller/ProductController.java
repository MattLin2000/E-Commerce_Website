package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }


    // 處理關鍵字搜索的 GET 請求方法
       
    @GetMapping("/search")
    public Page<Product> searchProducts(
            @RequestParam("keyword") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        
        // 創建分頁請求對象
        PageRequest pageable = PageRequest.of(page, size);
        return productService.searchProducts(keyword, pageable);
    }
}   
