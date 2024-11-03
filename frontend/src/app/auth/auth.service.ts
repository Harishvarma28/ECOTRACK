import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000'; // Update this to your backend URL
  private accessToken = '';
  private refreshToken = '';
  private userSubject = new BehaviorSubject<any>(null); // Track the user state
  public username='';
  public role='';
  public userid:any
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.username=response.username
        this.role=response.role
        this.isAuthenticated = true;
        this.userid=response.userid
        localStorage.setItem('access_token', this.accessToken); // Store access token in local storage
        localStorage.setItem('refresh_token', this.refreshToken); // Store refresh token as well
        localStorage.setItem('username', this.username); 
        localStorage.setItem('role', this.role);
        localStorage.setItem('userid',this.userid)
        this.userSubject.next({ ...response.user, username: this.username }); // Update the user state with username
        this.router.navigate(['/dashboard']);
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  logout() {
    this.accessToken = '';
    this.refreshToken = '';
    this.isAuthenticated = false;
    localStorage.removeItem('username');
    localStorage.removeItem('access_token'); // Clear access token on logout
    localStorage.removeItem('refresh_token'); // Clear refresh token on logout
    this.userSubject.next(null); // Clear user state
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem('access_token'); // Ensure the correct key is used
    } catch (e) {
      console.error('Error accessing localStorage', e);
      return null; // Handle error as needed
    }
  }
  
  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('access_token', token); // Also update local storage
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, { refresh_token: this.refreshToken }).pipe(
      tap((response) => {
        this.setAccessToken(response.access_token); // Reuse setAccessToken to store token
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, email, password }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  changePassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { email, new_password: newPassword, confirm_password: confirmPassword }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Additional method to get the current user
  getUsername(): any {
    console.log('auth',localStorage.getItem('username'))
    return localStorage.getItem('username') // Return the stored username
  }
  getrole(): any
  {
    console.log('auth',localStorage.getItem('role'))
    return localStorage.getItem('role') // Return the stored username
  }
  getuserid(): any
  {
    console.log('auth',localStorage.getItem('userid'))
    return localStorage.getItem('userid') // Return the stored username
  }
  isLoggedIn(): boolean {
    // Check if the user is logged in, e.g., by checking local storage
    return this.isAuthenticated || !!localStorage.getItem('username'); // Example check
}
}
