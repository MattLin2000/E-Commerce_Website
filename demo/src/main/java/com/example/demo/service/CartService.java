package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.CartDetail;
import com.example.demo.model.Product;
import com.example.demo.repository.CartDetailRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    public void addProductToCart(int cartId, int productId, int quantity ) {
        // 找到或創建一個新的購物車
        Cart cart = cartRepository.findByUserId(cartId); // 假設 user_id = 1，這部分你可以根據需要修改
        if (cart == null) {
            cart = new Cart();
            cart.setUserId(cartId);
            cartRepository.save(cart);
        }

        // 創建購物車細節
        CartDetail cartDetail = new CartDetail();
        cartDetail.setCartId(cart.getCartId());
        cartDetail.setProductId(productId);
        cartDetail.setQuantity(quantity);
        cartDetailRepository.save(cartDetail);
    }


    //透過id分頁查詢購物車內商品
    public List<Object> getProductsByUserId(int userId) {
        // 先尋找該用戶是否擁有購物車
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            // 搜索所有購物車內容
            List<CartDetail> details = cartDetailRepository.findAllByCart(cart);
    
            // 提取所有 productId
            List<Integer> productIds = details.stream()
                                            .map(CartDetail::getProductId)
                                            .collect(Collectors.toList());
        
            // 使用分頁查詢產品
            PageRequest pageRequest = PageRequest.of(0, 5);
           Page<Product> pageResult=productRepository.findByIdIn(productIds, pageRequest);
           List<Object> result = new ArrayList<>();
           result.add(0,pageResult);
           result.add(1,details);
            return result;
        }
        // 防止 null pointer 錯誤
        return new ArrayList<>();
    }
    

    //透過id 搜尋所有購物車內的商品
    public List<Object> getAllProductsByUserId(int userId) {
        // 先尋找該用戶是否擁有購物車
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            // 搜索所有購物車內容
            List<CartDetail> details = cartDetailRepository.findAllByCart(cart);
    
            // 提取所有 productId
            List<Integer> productIds = details.stream()
                                            .map(CartDetail::getProductId)
                                            .collect(Collectors.toList());
        
            List<Product> products =productRepository.findByIdIn(productIds);
            List<Object> result = new ArrayList<>();
            result.add(0,products);
            result.add(1,details);
            return result;
        }
        // 防止 null pointer 錯誤
        return new ArrayList<>();
    }

    //更新數量
    public boolean updateQuantity(int userId,int cartDetailId ,int product_id, int quantity){
        
        if(cartRepository.findByUserId(userId)!=null){
            CartDetail cartDetail = new CartDetail();
            cartDetail.setCartDetailId(cartDetailId);
            cartDetail.setProductId(product_id);
            cartDetail.setQuantity(quantity);
            cartDetail.setCart(cartRepository.findByUserId(userId));
            cartDetailRepository.save(cartDetail);
            return true;
        }
        return  false;
    }
    

    //刪除購物車內商品
    public ResponseEntity<String> deleteProduct(int userId,int cartDetailId,int productId){
        
        if(cartRepository.findByUserId(userId)!=null){
    
                cartDetailRepository.deleteById(cartDetailId);
        }
        return ResponseEntity.ok("delete success!");
    }
    
}

    