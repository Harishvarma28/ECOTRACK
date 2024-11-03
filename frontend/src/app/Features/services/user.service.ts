import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.delete<void>(`${this.apiUrl}/delete`, { body });
  }

  requestPasswordChange(email: string, tempPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-change`, { email, tempPassword });
  }

  updatePassword(email: string, otp: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, { email, otp, new_password: newPassword, confirm_password: confirmPassword });
  }
}
