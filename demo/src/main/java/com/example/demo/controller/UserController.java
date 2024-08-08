package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register/add")
    public ResponseEntity<String> addNewUser(
            @RequestParam String firstname,
            @RequestParam String lastname,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String tel) {

        User newUser = new User();
        newUser.setUsername(firstname + "," + lastname);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setTel(tel);
        newUser.setRole("customer");

        userRepository.save(newUser);
        return ResponseEntity.ok("User saved successfully");
    }
}