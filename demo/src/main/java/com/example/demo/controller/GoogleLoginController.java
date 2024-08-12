package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.service.GoogleOauthService;

@Controller
public class GoogleLoginController {

    @Autowired
    private GoogleOauthService googleOauthService;

    @GetMapping("/login/google")
    public String loginWithGoogle() {
        // 重定向到 Google 授權頁面
        return "redirect:" + googleOauthService.login();
    }

    @GetMapping("/callback/google")
    public String callback(@RequestParam String code, Model model) throws Exception {
        // 處理 Google 回調並獲取用戶信息
        String userInfo = googleOauthService.handleCallback(code);
        model.addAttribute("userInfo", userInfo);
        // 重定向到主頁，或者可以根據需要返回一個視圖名稱
        return "index"; // 根據實際需要改為重定向或返回首頁視圖
    }
}
