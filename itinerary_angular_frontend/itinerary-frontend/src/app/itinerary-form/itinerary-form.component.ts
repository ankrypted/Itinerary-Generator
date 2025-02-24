import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private http: HttpClient) {}

  onSubmit() {
    const request = {
      destination: this.destination,
      duration: this.duration,
      preferences: this.preferences,
    };

    this.http
      .post<{ itinerary: string }>('http://localhost:8080/api/itinerary/generate', request)
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