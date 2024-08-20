package com.example.demo.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface GoogleOauthService {
    String login();

    String handleCallback(String code) throws JsonProcessingException;
}
