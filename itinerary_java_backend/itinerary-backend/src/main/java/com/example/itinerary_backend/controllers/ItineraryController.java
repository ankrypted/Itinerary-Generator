//package com.example.itinerary_backend.controllers;

package com.example.itinerary_backend.controllers;

import com.example.itinerary_backend.dto.ItineraryRequest;
import com.example.itinerary_backend.dto.ItineraryResponse;
import com.example.itinerary_backend.services.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @PostMapping("/generate")
    public ItineraryResponse generateItinerary(@RequestBody ItineraryRequest request) {
        return itineraryService.generateItinerary(request);
    }

    @GetMapping("/")
    public String homepage() {
        return "Welcome to the itinerary generator!";
    }
}
