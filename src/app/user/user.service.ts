import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HelperService } from '../shared/helper.service';
import { User, HttpSuccessResponse } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private http: HttpClient,
                private helperService: HelperService  ) { }

  getUsers(): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${this.helperService.baseUrl}/users`);
  }

  createUser(user: User): Observable<HttpSuccessResponse> {
    return this.http.post<HttpSuccessResponse>(`${this.helperService.baseUrl}/users`, user);
  }

  updateUser(user: User): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.helperService.baseUrl}/users`, user);
  }

  deleteUser(user: User): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${this.helperService.baseUrl}/users/${user.nick}`);
  }

}
