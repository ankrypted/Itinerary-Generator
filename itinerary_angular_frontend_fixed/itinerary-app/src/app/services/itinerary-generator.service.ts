import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItineraryGeneratorService {

  constructor(private http: HttpClient) { }


  public itineraryGenerator(destination: string, duration: number, preferences: string) : Observable<any> {
    const request = {
      destination: destination,
      duration: duration,
      preferences: preferences,
    };
    
    const token = localStorage.getItem('access_token');


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      
    });

    return this.http
      .post<{ itinerary: string }>('http://localhost:8080/api/itinerary/generate', request, {headers})
  }
  
}
