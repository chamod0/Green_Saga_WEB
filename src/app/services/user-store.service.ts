import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private fullname$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private userId$ = new BehaviorSubject<string>('');
  constructor() {}
  public getUserIdFromStore() {
    return this.userId$.asObservable();
  }
  public setUserIdFormStore(userId: string) {
    this.userId$.next(userId);
  }
  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleFormStore(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStore() {
    return this.fullname$.asObservable();
  }
  public setFullNameFormStore(fullname: string) {
    this.fullname$.next(fullname);
  }
}
