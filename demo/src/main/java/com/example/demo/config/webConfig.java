package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.interceptor.loginCheckInterceptor;

@Configuration
public class webConfig implements WebMvcConfigurer{
    @Autowired
    loginCheckInterceptor loginCheckInterceptor;

    @Override
 
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckInterceptor)
        .addPathPatterns("/**") // 拦截所有请求
        .excludePathPatterns("/")
        .excludePathPatterns("/login") // 不拦截登录路径
        .excludePathPatterns("/register") // 不拦截注册路径
        .excludePathPatterns("/css/**") // 不拦截 CSS 文件路径
        .excludePathPatterns("/js/**") // 不拦截 JS 文件路径
        .excludePathPatterns("/images/**"); // 不拦截图片路径
    }
}
