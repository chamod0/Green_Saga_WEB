import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7262/api/User/';
  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
  getSupervisor() {
    return this.http.get<any>(`${this.baseUrl}getUserByRole/0/supervisor`);
  }
  getUsersbyid(ID: any) {
    return this.http.get<any>(`${this.baseUrl}getUserByID/` + ID);
  }
}
