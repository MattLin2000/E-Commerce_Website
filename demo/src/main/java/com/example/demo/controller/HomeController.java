package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
<<<<<<< HEAD
        return "index"; // 確保 index.html 正確設置
=======
        return "index";
>>>>>>> 95662592c5744e560d5f5c0be94892faa69bd0e1
    }

    @GetMapping("/register")
    public String register() {
<<<<<<< HEAD
        return "register"; // 確保 register.html 正確設置
=======
        return "register";
>>>>>>> 95662592c5744e560d5f5c0be94892faa69bd0e1
    }

    @GetMapping("/login")
    public String login() {
<<<<<<< HEAD
        return "login"; // 確保 login.html 正確設置
=======
        return "login";
>>>>>>> 95662592c5744e560d5f5c0be94892faa69bd0e1
    }
}
