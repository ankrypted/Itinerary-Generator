package com.example.auth.config;

import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.oauth2.core.DefaultOAuth2AuthenticatedPrincipal;

import java.time.Instant;
import java.util.Collections;
import java.util.Map;

public class GoogleOpaqueTokenIntrospector implements OpaqueTokenIntrospector {

    private static final String GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=";
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public OAuth2AuthenticatedPrincipal introspect(String token) {
        try {
            String url = GOOGLE_TOKEN_INFO_URL + token;
            Map<String, Object> attributes = restTemplate.getForObject(url, Map.class);

            if (attributes == null || attributes.containsKey("error")) {
                throw new OAuth2AuthenticationException(new OAuth2Error("invalid_token", "Invalid Google token", null));
            }

            // ✅ Convert "exp" from String to Instant
            if (attributes.containsKey("exp")) {
                try {
                    long expEpoch = Long.parseLong(attributes.get("exp").toString());
                    attributes.put("exp", Instant.ofEpochSecond(expEpoch)); // Convert to Instant
                } catch (NumberFormatException e) {
                    throw new OAuth2AuthenticationException(new OAuth2Error("invalid_token", "Invalid expiration time in token", null), e);
                }
            }

            return new DefaultOAuth2AuthenticatedPrincipal(
                    attributes.getOrDefault("email", "unknown_user").toString(), // Principal name = email
                    attributes,
                    Collections.emptyList() // No roles in Google's response
            );
        } catch (Exception e) {
            throw new OAuth2AuthenticationException(new OAuth2Error("token_validation_error", "Failed to introspect Google token", null), e);
        }
    }
}
