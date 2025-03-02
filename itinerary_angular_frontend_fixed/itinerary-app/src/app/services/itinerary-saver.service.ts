import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItinerarySaverService {

  constructor(private http: HttpClient) { }
  
  
    public itinerarySaver(destination: string, duration: number, preferences: string, itinerary: string, username: string) : Observable<any> {
      const request = {
        destination: destination,
        duration: duration,
        preferences: preferences,
        itinerary: itinerary,
        username: username
      };
      
      const token = localStorage.getItem('access_token');
  
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        
      });
  
      return this.http
        .post<{ itinerary: string }>('http://localhost:8080/api/itinerary/save', request, {headers})
    }
}
