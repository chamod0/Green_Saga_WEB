import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private userPayload: any;
  private baseUrl: string = 'https://localhost:7262/api/Project/';
  constructor(private http: HttpClient, private router: Router) {}

  createProject(projectObj: any) {
    debugger;
    return this.http.post<any>(`${this.baseUrl}projectCreate`, projectObj);
  }
  getProject(userID: any, proID: any) {
    return this.http.get<any>(
      `${this.baseUrl}getProject/` + proID + `/` + userID
    );
  }
  getProjectForSupervisor(userID: any, proID: any) {
    return this.http.get<any>(
      `${this.baseUrl}getProjectForSupervisor/` + proID + `/` + userID
    );
  }
  add(projectObj: any) {
    debugger;
    return this.http.post<any>(`${this.baseUrl}projectCreate`, projectObj);
  }
}
