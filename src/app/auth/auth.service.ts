import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { HelperService } from '../shared/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authUser: BehaviorSubject<any>; 
  public seeAuthUser: Observable<any>; 

  constructor(private http: HttpClient,
              private helperService: HelperService  ) { 
    this.authUser = new BehaviorSubject(this.getToken());
    this.seeAuthUser = this.authUser.asObservable(); 
  }

  setToken(token: any): void {
    localStorage.setItem('pegasus_token', JSON.stringify(token));
  }

  getToken() {
    let token = localStorage.getItem('pegasus_token');
    if (!token) {
      return null;
    }
    return JSON.parse(localStorage.getItem('pegasus_token'));
  }

  authenticate(values): Observable<any> {
    return this.http.post<any>(`${this.helperService.baseUrl}/login`, values);
  }

  logout(): void {
    localStorage.removeItem('bagda_token');
    this.authUser.next(null);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.helperService.baseUrl}/users`);
  }

  createUser(user): Observable<any> {
    return this.http.post<any>(`${this.helperService.baseUrl}/users`, user);
  }

  updateUser(user): Observable<any> {
    return this.http.put<any>(`${this.helperService.baseUrl}/users`, user);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete<any>(`${this.helperService.baseUrl}/users/${user.nick}`);
  }

}
