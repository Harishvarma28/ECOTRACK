import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../Features/services/toast.service';
import { response } from 'express';

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

  constructor(private http: HttpClient, private router: Router, private toastService: ToastService ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {

         // Check if the user is inactive
      if (response.status === 'Inactive') {
        // Display a message and throw an error if the user is inactive
        console.log("response status",response.status)
        this.toastService.error('Your account is inactive. Please contact support for assistance.','Warning');
        throw new Error('Inactive user');
      }
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
        if(response.status==="New User") {
          // Redirect to change password page for new users
          this.router.navigate(['/auth/changepassword']);
          this.toastService.info('Please change your password to proceed.','Info', 5000);
        }
        else{
        this.router.navigate(['/dashboard']);
        
        this.toastService.success('Login successful!', 'Welcome');
        }
        console.log("check stauts",response.status)
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
    this.toastService.info('You have been logged out successfully.', 'Info', 5000);

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
      tap((response) => {
        this.toastService.success('Password changed successfully! Please log in with your new password.'); // Success toast
      }),
      catchError((error) => {
        console.log(error)
        this.handleError(error); // Call handleError to display error messages
        return throwError(error);
      })
    );
  }

  // Method to handle errors
  private handleError(error: any) {
    if (error.status === 403) {
      this.toastService.error('User is inactive, password change is not allowed', 'Error');
    } else {
      this.toastService.error('An unexpected error occurred. Please try again later.', 'Error');
    }
    return throwError(error);
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
