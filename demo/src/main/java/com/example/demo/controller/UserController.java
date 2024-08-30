package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.JwtUtils;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/register")
public class UserController {


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/add")
    public ResponseEntity<String> addNewUser(
            @RequestBody User user) {
      // 將密碼加密後再保存
      String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      user.setRole("admin");
      userRepository.save(user);

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
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        User dbUser = userService.findByEmail(user.getEmail());
        if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
            session.setAttribute("user", dbUser);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User loginRequest) {
    try {
        // 驗證使用者身份
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        
        // 設定安全上下文
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // 加載用戶詳細資料
        UserDetails user = userService.loadUserByUsername(loginRequest.getUsername());
        
        // 生成 JWT Token
        String jwt = jwtUtils.generateToken(user);
        System.out.println("Generated JWT: " + jwt); // 添加日誌
        
        // 返回 JWT Token 和用戶名稱作為響應
        Map<String, Object> response = new HashMap<>();
        response.put("jwtToken", jwt);
        response.put("username", user.getUsername());
        
        return ResponseEntity.ok(response); // 返回 200 OK 並包含 JWT Token
    } catch (Exception e) {
        e.printStackTrace(); // 捕獲並記錄異常，建議使用 Logger 替代
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed"); // 返回未授權狀態
    }
}


}