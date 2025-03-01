import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserHelperService {

  constructor(private http: HttpClient) { }
  userName: string = ""

  getToken(): string | null {
    return localStorage.getItem('access_token'); // ✅ Retrieve token from localStorage
  }

  fetchUserDetails() {
    const token = this.getToken(); // ✅ Use stored token
        if (!token) {
          console.error('No access token found!');
          return;
        }
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ Attach token to request
        });
    
        return this.http.get<{email: string}>('http://localhost:8080/api/user', { headers })
  }
}
