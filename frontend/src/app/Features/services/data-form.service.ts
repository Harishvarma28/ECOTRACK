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
    return this.http.post(`${this.baseUrl}/submit-recycling-collection`, data);
  }

  submitRevenue(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit-revenue`, data);
  }

  submitLandfillExpense(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit-landfill-expense`, data);
  }
}
