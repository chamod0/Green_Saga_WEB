import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  private baseUrl: string = 'https://localhost:7262/api/User/';
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    // localStorage.removeItem('token');
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  isLoggedin(): boolean {
    debugger;
    return !!localStorage.getItem('token');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();

    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token);
  }
  getFullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }
  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}Refresh`, tokenApi);
  }
}
