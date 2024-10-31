import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  private baseUrl = 'http://localhost:5000'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  submitRecyclingCollection(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recycling-collection`, data);
  }

  submitRecyclingRevenue(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recycling-revenue`, data);
  }

  submitLandfillExpense(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/landfill-expense`, data);
  }
}
