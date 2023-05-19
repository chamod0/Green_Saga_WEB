import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TimeLineService {
  private userPayload: any;
  private baseUrl: string = 'https://localhost:7262/api/TimeLine/';
  constructor(private http: HttpClient, private router: Router) {}

  addToTimeLine(TimeLineObj: any) {
    debugger;
    return this.http.post<any>(`${this.baseUrl}timeLineCreate`, TimeLineObj);
  }
  getTimeLine(userID: any, proID: any) {
    return this.http.get<any>(
      `${this.baseUrl}getTimeLineForFarmer/` + proID + `/` + 0
    );
  }
  deleteTimeLineBox(ID: any) {
    return this.http.delete<any>(`${this.baseUrl}deleteTimeLine/` + ID);
  }
}
