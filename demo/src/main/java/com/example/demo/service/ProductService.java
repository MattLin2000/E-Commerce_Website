package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Product;
import com.example.demo.model.myData;
import com.example.demo.repository.ProductRepository;



@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 根據關鍵字搜索產品的方法
    public Page<Product> searchProducts(String keyword,PageRequest pageable) {
        return productRepository.findByNameContaining(keyword, pageable );
    }

    
    public Product updateProduct(Product updatedProduct) {
        return productRepository.save(updatedProduct);
    }
    
    public void deleteProduct(int id){
        productRepository.deleteById(id);
    }

    public Page<Product> findByNameContainingAndProductId(myData data){
        int page = data.getData().getPage();
        int size = data.getData().getSize();
        PageRequest pageable = PageRequest.of(page, size);
        
        String name = data.getData().getName();
        Integer productId = data.getData().getProductId();
        System.out.println(page);
        System.out.println(size);
        System.out.println(name);
        System.out.println(productId);
       
        return productRepository.findByNameContainingAndProductId(name, productId, pageable);
    }

 
    public Product AddProduct(Product product){
        return productRepository.save(product);
    }

    public ResponseEntity<String> uploadImage(MultipartFile file){
        try {
        String originalFileName = file.getOriginalFilename();
        System.out.println(originalFileName);
        //獲得文件格式
        String suffix = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = UUID.randomUUID().toString();         
        // 保存圖片到指定路徑
        file.transferTo(new File("/Users/linchengxin33/myCode/E-Commerce_Website/Client/public/images/products/" + fileName + suffix));
        // 回傳圖片的 URL
        String imageUrl = "/images/products/" + fileName + suffix;
        return ResponseEntity.ok(imageUrl);
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("錯誤");
    }

    }

}
    

