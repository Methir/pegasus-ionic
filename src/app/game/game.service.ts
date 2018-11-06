import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HelperService } from './../shared/helper.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(  private helperService: HelperService,
                private http: HttpClient  ) { }
 
  getGames(): Observable<any>{
    return this.http.get(`${this.helperService.baseUrl}/games`);
  }

  resetGames(): Observable<any>{
    return this.http.get(`${this.helperService.baseUrl}/games/reset`);
  }

}
