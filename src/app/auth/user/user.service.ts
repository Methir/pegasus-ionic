import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HelperService } from '../../shared/helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private http: HttpClient,
                private helperService: HelperService  ) { }

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
