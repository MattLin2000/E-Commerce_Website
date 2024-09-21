package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Amount;
import com.example.demo.model.CartDetail;
import com.example.demo.model.User;
import com.example.demo.service.CartService;


@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
//新增商品到購物車
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartDetail addToCart) {
        //cartId為UserId
        cartService.addProductToCart(addToCart.getCart().getCartId(),addToCart.getProduct(), addToCart.getQuantity());
        return ResponseEntity.ok("Product added to cart");
    }
//獲得購物車內容(搜索欄右邊)
    @GetMapping("/get")
    public Page<CartDetail> getCartDetails(@RequestParam int id) {
        return cartService.getProductsByUserId(id);
    }

    //獲得購物車內容（全部）總購物車頁面
    @GetMapping("/getAll")
    public List<CartDetail> getAllCartDetails(@RequestParam int id) {
        return cartService.getAllProductsByUserId(id);
    }


    @PatchMapping("/updateQuantity")
public ResponseEntity<String> updateQuantity(
    @RequestParam int userId,
    @RequestParam int quantity,
    @RequestParam int product_id,
    @RequestParam int cartDetailId) {
    boolean success = cartService.updateQuantity(userId,cartDetailId, product_id, quantity);
    
    if (success) {
        return ResponseEntity.ok("Quantity updated successfully");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update quantity");
    }
}

@DeleteMapping("/deleteProduct")
public ResponseEntity<String> deleteProduct(
    @RequestParam int userId,
    @RequestParam int cartDetailId,
    @RequestParam int productId
){

    return cartService.deleteProduct(userId,cartDetailId,productId);
}

@PostMapping("/getTotalAmount")
    public ResponseEntity<Amount> getTotalAmountById(@RequestBody User user){
        System.out.println(user.getUserId());
        return cartService.getTotalAmountById(user.getUserId());
    }


}

