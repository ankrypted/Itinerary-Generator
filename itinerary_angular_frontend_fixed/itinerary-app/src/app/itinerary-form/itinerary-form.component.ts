import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItineraryGeneratorService } from '../services/itinerary-generator.service';
// import { OAuthService } from 'angular-oauth2-oidc';
// import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itinerary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './itinerary-form.component.html',
  styleUrls: ['./itinerary-form.component.css'],
})
export class ItineraryFormComponent {
  destination: string = '';
  duration: number = 0;
  preferences: string = '';
  itinerary: string = '';

  constructor(private http: HttpClient, private itineary_service: ItineraryGeneratorService) {}

  onSubmit() {
    const request = {
      destination: this.destination,
      duration: this.duration,
      preferences: this.preferences,
    };
    
    const token = localStorage.getItem('access_token');

    if(!token) {
      console.error("No access token found");
      return;
    }

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    //   // 'Content-Type': 'application/json', // Explicitly set Content-Type
    //   // 'Access-Control-Request-Headers': 'content-type',
    //   // 'Cache-Control': 'no-cache'
    // });

    this.itineary_service.itineraryGenerator(request.destination, request.duration, request.preferences)
    .subscribe({
        next: (response) => {
          this.itinerary = response.itinerary;
        },
        error: (error) => {
          console.error('Error generating itinerary:', error);
        },
        complete: () => {
          console.log('Itinerary generation request completed.');
        }  
      });
  }
}