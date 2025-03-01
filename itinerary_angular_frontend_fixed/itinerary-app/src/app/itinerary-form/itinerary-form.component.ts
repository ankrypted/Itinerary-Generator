import { ItineraryGeneratorService } from './../services/itinerary-generator.service';
import { ItinerarySaverService } from './../services/itinerary-saver.service';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  loading: boolean = false;
  username: string = '';
  
  

  constructor(private http: HttpClient, private itineary_service: ItineraryGeneratorService, private itinerarySaverService: ItinerarySaverService) {}


  refresh_form() {
    this.loading = false;
    this.itinerary = '';
  }
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

    
    this.loading = true;

    this.itineary_service.itineraryGenerator(request.destination, request.duration, request.preferences)
    .subscribe({
        next: (response) => {
          this.itinerary = response.itinerary;
          // localStorage.setItem('itinerary', this.itinerary);
          
          this.loading = false;
        },
        error: (error) => {
          console.error('Error generating itinerary:', error);
        },
        complete: () => {
          console.log('Itinerary generation request completed.');
        }  
      });
  }

  save_itinerary() {
    this.username = localStorage.getItem('username') || "";
    this.itinerarySaverService.itinerarySaver(this.destination, this.duration, this.preferences, this.itinerary, this.username)?.subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}