//package com.example.itinerary_backend.controllers;

package com.example.itinerary_backend.controllers;

import com.example.itinerary_backend.dto.ItineraryRequest;
import com.example.itinerary_backend.dto.ItineraryResponse;
import com.example.itinerary_backend.entities.ItineraryEntity;
import com.example.itinerary_backend.repositories.ItineraryRepository;
import com.example.itinerary_backend.services.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import static com.example.auth.config.SecurityConfig.logger;

//@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;
    @Autowired
    private ItineraryRepository itineraryRepository;


    @PostMapping("/generate")
    public ItineraryResponse generateItinerary(@RequestBody ItineraryRequest request) {
//        logger.info("Received request to generate itinerary: {}", request);
        return itineraryService.generateItinerary(request);
    }
//    @RequestMapping(method = RequestMethod.OPTIONS)
//    public void handleOptions() {
//        logger.info("Handling OPTIONS request for /api/itinerary/generate");
//    }
    @GetMapping("/")
    public String homepage() {
        return "Welcome to the itinerary generator!";
    }

    @PostMapping("/save")
    public String save_itinerary(@RequestBody ItineraryRequest request) {
        ItineraryEntity itineraryEntity = new ItineraryEntity();
        System.out.println(request.getDestination().toString());
        itineraryEntity.setDestination(request.getDestination());
        itineraryEntity.setDuration(request.getDuration());
        itineraryEntity.setPreferences(request.getPreferences());
        itineraryEntity.setItinerary(request.getItinerary());
        itineraryEntity.setUsername(request.getUsername());
        itineraryRepository.save(itineraryEntity);
        return "Itinerary saved successfully!";
    }
}
