package com.example.itinerary_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.itinerary_backend", "com.example.auth.config", "com.example.auth"})
public class ItineraryBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItineraryBackendApplication.class, args);
	}

}


