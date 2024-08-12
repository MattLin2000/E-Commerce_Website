package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

@Service
public class GoogleOauthServiceImpl implements GoogleOauthService {

    @Value("${oauth2.provider.google.auth-uri}")
    private String authUri;
    @Value("${oauth2.provider.google.token-uri}")
    private String tokenUri;
    @Value("${oauth2.provider.google.user-info-uri}")
    private String userInfoUri;
    @Value("${oauth2.registration.google.client-id}")
    private String clientId;
    @Value("${oauth2.registration.google.client-secret}")
    private String clientSecret;
    @Value("${oauth2.registration.google.redirect-uri}")
    private String redirectUri;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private UserRepository userRepository;

    @Override
    public String login() {
        return UriComponentsBuilder.fromHttpUrl(authUri)
                .queryParam("scope", "profile email")
                .queryParam("response_type", "code")
                .queryParam("redirect_uri", redirectUri)
                .queryParam("client_id", clientId)
                .build()
                .encode()
                .toUriString();
    }

    @Override
    public String handleCallback(String code) throws JsonProcessingException {
        String accessToken = getAccessToken(code);
        String userInfo = getUserInfo(accessToken);

        // 解析 userInfo
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(userInfo);
        String email = rootNode.get("email").asText();
        String username = rootNode.get("name").asText();
        String sub = rootNode.get("sub").asText();

        // 創建或更新用戶
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(sub); // 或者使用預設值或空值
        } else {
            user.setUsername(username);
        }
        userRepository.save(user);

        return userInfo; // 可以返回一些成功的信息或其他處理結果
    }

    private String getAccessToken(String code) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = createTokenRequestBody(code);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(tokenUri, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to get access token: " + response.getStatusCode());
        }

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(responseBody);
        return rootNode.get("access_token").asText();
    }

    private MultiValueMap<String, String> createTokenRequestBody(String code) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", code);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", redirectUri);
        body.add("grant_type", "authorization_code");

        return body;
    }

    private String getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(userInfoUri, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
