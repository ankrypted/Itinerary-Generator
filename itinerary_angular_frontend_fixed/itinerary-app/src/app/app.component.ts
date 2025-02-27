import { Component, OnInit } from '@angular/core';
import { ItineraryFormComponent } from './itinerary-form/itinerary-form.component';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItineraryFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userDetails: any;
  userName: String = '';

  constructor(private oauthService: OAuthService, private http: HttpClient) {}

  ngOnInit() {
    this.configureOAuth();
  }

  title = 'itinerary-frontend';

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com', // Google OAuth2 issuer
      redirectUri: window.location.origin, // Redirect to the current app
      clientId: '555927772588-s2jspgmgepf18d7sed4o50cv3lkr6qca.apps.googleusercontent.com', // Replace with your Google Client ID
      scope: 'openid profile email', // Requested scopes
      strictDiscoveryDocumentValidation: false, // Disable strict validation
    });

    // Load discovery document and try logging in with stored token
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      const token = this.oauthService.getAccessToken();
      if (token) {
        localStorage.setItem('access_token', token); // ✅ Store token in localStorage
      }

      if (this.isLoggedIn()) {
        this.fetchUserDetails();
      }
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    localStorage.removeItem('access_token'); // ✅ Remove token on logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // ✅ Check localStorage for token
  }

  getToken(): string | null {
    return localStorage.getItem('access_token'); // ✅ Retrieve token from localStorage
  }

  // userName(): string {
  //   const claims = this.oauthService.getIdentityClaims();
  //   return claims ? claims['name'] : '';
  // }

  /**
   * ✅ Fetch user details from backend after login
   */
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

    this.http.get<{email: String}>('http://localhost:8080/api/user', { headers }).subscribe({
      next: (details) => {
        this.userName = details.email;
        console.log('User details:', this.userName);
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }
}
