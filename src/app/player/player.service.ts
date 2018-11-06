import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HelperService } from './../shared/helper.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(  private helperService: HelperService,
                private http: HttpClient ) { }

  getPlayers(): Observable<any> {
    return this.http.get(`${this.helperService.baseUrl}/players`);
  }

  createPlayer(player): Observable<any> {
    return this.http.post<any>(`${this.helperService.baseUrl}/players`, player);
  }

  updatePlayer(player): Observable<any> {
    return this.http.put<any>(`${this.helperService.baseUrl}/players`, player);
  }

  deletePlayer(player): Observable<any> {
    return this.http.delete<any>(`${this.helperService.baseUrl}/players/${player.nick}`);
  }

}
