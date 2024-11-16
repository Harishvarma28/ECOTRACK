import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

interface User {
  name: string;
  contact: string;
  university: string;
  status: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }
  

  addUser(user: { name: string; contact: string; university: string; status: string; email: string; role: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/edit`, user);
  }

  deleteUser(email: string): Observable<void> {
    const body = { email };
    return this.http.delete<void>(`${this.apiUrl}/delete`, { body }).pipe(
      catchError(error => {
        // Check for a foreign key constraint violation message in the error response
        if (error.status === 400 && error.error && error.error.error) {
          // Custom message from backend
          return throwError(() => new Error(error.error.error));
        }
        // Handle any other errors
        return throwError(() => new Error('Error deleting user: ' + error.message));
      })
    );
  }
  

  requestPasswordChange(email: string, tempPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-change`, { email, tempPassword });
  }

  updatePassword(email: string, otp: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, { email, otp, new_password: newPassword, confirm_password: confirmPassword });
  }


  
}
