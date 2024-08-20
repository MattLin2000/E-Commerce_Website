package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.CartDetail;
import com.example.demo.repository.CartDetailRepository;
import com.example.demo.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    public void addProductToCart(int productId, int quantity) {
        // 找到或創建一個新的購物車
        Cart cart = cartRepository.findByUserId(1); // 假設 user_id = 1，這部分你可以根據需要修改

        if (cart == null) {
            cart = new Cart();
            cart.setUserId(1);
            cartRepository.save(cart);
        }

        // 創建購物車細節
        CartDetail cartDetail = new CartDetail();
        cartDetail.setCartId(cart.getCartId());
        cartDetail.setProductId(productId);
        cartDetail.setQuantity(quantity);
        cartDetailRepository.save(cartDetail);
    }
}
