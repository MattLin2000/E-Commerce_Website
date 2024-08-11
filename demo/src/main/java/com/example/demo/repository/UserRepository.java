package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    // 檢查用戶信箱是否存在
    boolean existsByEmail(String email);

    // 根據用戶信箱查找用戶
    User findByEmail(String email);
}
