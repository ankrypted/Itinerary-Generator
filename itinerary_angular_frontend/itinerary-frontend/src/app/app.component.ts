import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItineraryFormComponent } from './itinerary-form/itinerary-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItineraryFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'itinerary-frontend';
}
