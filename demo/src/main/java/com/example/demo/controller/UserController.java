package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.model.loginResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;

@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;
    
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

        userService.addNewUser(firstname, lastname, password, email, tel);

        return ResponseEntity.ok("User saved successfully");
    }

    @PostMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean exists = userRepository.existsByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/email_login")
public ResponseEntity<loginResponse> login(@RequestBody User user) {
    try {
        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
            Map<String, Object> map = new HashMap<>();
            map.put("email", dbUser.getEmail());
            map.put("password", dbUser.getPassword());

        String jwt = jwtService.generateToken(map);

            return ResponseEntity.ok(new loginResponse(jwt,"login success"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new loginResponse(null, "Invalid username or password"));
        }
    } catch (Exception e) {
        e.printStackTrace();  // Log the exception
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new loginResponse(null, "An error occurred"));
    }
}

}