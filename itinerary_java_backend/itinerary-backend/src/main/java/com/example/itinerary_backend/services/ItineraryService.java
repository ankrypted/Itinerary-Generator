package com.example.itinerary_backend.services;

import com.example.itinerary_backend.dto.ItineraryRequest;
import com.example.itinerary_backend.dto.ItineraryResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ItineraryService {

    private static final String GO_SERVICE_URL = "http://localhost:8081/generate-itinerary";

    public ItineraryResponse generateItinerary(ItineraryRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(GO_SERVICE_URL, request, ItineraryResponse.class);
    }
}