import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { HelperService } from '../shared/helper.service';
import { HttpSuccessResponse, Token } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authUser: BehaviorSubject<Token>; 
  public seeAuthUser: Observable<Token>; 

  constructor(  private http: HttpClient,
                private helperService: HelperService  ) { 
    this.authUser = new BehaviorSubject(this.getToken());
    this.seeAuthUser = this.authUser.asObservable(); 
  }

  setToken(token: Token): void {
    localStorage.setItem('pegasus_token', JSON.stringify(token));
  }

  getToken(): Token {
    let token = localStorage.getItem('pegasus_token');
    if (!token) {
      return null;
    }
    return JSON.parse(localStorage.getItem('pegasus_token'));
  }

  authenticate(values): Observable<HttpSuccessResponse> {
    return this.http.post<HttpSuccessResponse>(`${this.helperService.baseUrl}/login`, values);
  }

  logout(): void {
    localStorage.removeItem('bagda_token');
    this.authUser.next(null);
  }
  
}
