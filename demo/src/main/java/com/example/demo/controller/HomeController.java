package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index"; // 確保 index.html 正確設置
    }

    @GetMapping("/register")
    public String register() {
        return "register"; // 確保 register.html 正確設置
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // 確保 login.html 正確設置
    }
}
