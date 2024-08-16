package com.example.demo.service;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.config.JwtConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

    @Autowired
    private JwtConfig jwtConfig;

    public String generateToken(Map map) {
        return  Jwts.builder()
                             .addClaims(map)
                             .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecretKey())
                             .setExpiration(new Date(System.currentTimeMillis() + 43200000))
                             .compact();

    }

    public Claims parseToken(String token) {
       
        return Jwts.parser()
            .setSigningKey(jwtConfig.getSecretKey())
            .parseClaimsJws(token)
            .getBody();
    }
}

