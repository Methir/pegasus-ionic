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

  }

  setToken(token: any): void {
  
  }

  getToken(): void {

  }

  register(values): void {

  }

  authenticate(values): void {

  }

  logout(): void {

  }

}
