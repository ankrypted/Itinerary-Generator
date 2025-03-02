package com.example.auth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

//    @GetMapping("/user")
//    public String validateToken(@AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
//        logger.info("Entered user endpoint");
//        logger.info("Principal :{}", principal);
//        if (principal != null) {
//            logger.info("Authenticated user: {}", principal.getAttributes().get("email"));
//            return (String) principal.getAttributes().get("email");
//        }
//        logger.warn("Authentication failed or user not found");
//        return "Bad Request! Authentication failed!";
//    }
//    @GetMapping("/user")
//    public String getUserDetails() {
//        // Get the authentication object from the security context
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        // Check if the authentication object contains an OAuth2 token
//        if (authentication instanceof BearerTokenAuthentication) {
//            BearerTokenAuthentication bearerTokenAuth = (BearerTokenAuthentication) authentication;
//
//            // Access the OAuth2 token
//            OAuth2AccessToken accessToken = bearerTokenAuth.getToken();
//            String tokenValue = accessToken.getTokenValue(); // Get the raw token value
//
//            return "OAuth2 Token: " + tokenValue;
//        }
//
//        return "No valid OAuth2 token found.";
//    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> validateToken(@AuthenticationPrincipal OAuth2AuthenticatedPrincipal principal) {
        logger.info("Entered user endpoint");

        if (principal != null) {
            String email = (String) principal.getAttributes().get("email");
            logger.info("Authenticated user: {}", email);

            Map<String, String> response = new HashMap<>();
            response.put("email", email);

            return ResponseEntity.ok(response); // ✅ Returning JSON instead of raw string
        }

        logger.warn("Authentication failed or user not found");
        return ResponseEntity.badRequest().build();
    }
}


