import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HelperService } from './../shared/helper.service';
import { HttpSuccessResponse } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(  private helperService: HelperService,
                private http: HttpClient  ) { }
 
  getGames(): Observable<HttpSuccessResponse>{
    return this.http.get<HttpSuccessResponse>(`${this.helperService.baseUrl}/games`);
  }

  resetGames(): Observable<HttpSuccessResponse>{
    return this.http.get<HttpSuccessResponse>(`${this.helperService.baseUrl}/games/reset`);
  }

}
