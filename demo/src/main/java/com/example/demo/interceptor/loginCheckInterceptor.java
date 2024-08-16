package com.example.demo.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.demo.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class loginCheckInterceptor implements HandlerInterceptor{
    
    @Autowired
    JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
      
        //1.請求url 
        String url = request.getRequestURL().toString();
        //2.如果為登入行為 允許進入
        if(url.contains("login")){
            return true;
        }
        //3. 請求token
        String jwt = request.getHeader("token");

        //4.判斷令牌是否存在
        if(jwt==null){
            return false;
        }
        //5.驗證令牌
        try {
            jwtService.parseToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }



        return true;
    }
}
