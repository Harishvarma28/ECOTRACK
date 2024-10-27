import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Update this to your backend URL
  private apiUrl = 'http://127.0.0.1:5000'; // Update this to your backend URL

  constructor(private http: HttpClient) {}

  // Login method to authenticate users
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, email, password });
  }

  // Change password method
  changePassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { email, new_password: newPassword, confirm_password: confirmPassword });
  }


}
