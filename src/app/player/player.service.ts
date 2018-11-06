import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HelperService } from './../shared/helper.service';
import { HttpSuccessResponse, Player } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(  private helperService: HelperService,
                private http: HttpClient ) { }

  getPlayers(): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${this.helperService.baseUrl}/players`);
  }

  createPlayer(player: Player): Observable<HttpSuccessResponse> {
    return this.http.post<HttpSuccessResponse>(`${this.helperService.baseUrl}/players`, player);
  }

  updatePlayer(player: Player): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.helperService.baseUrl}/players`, player);
  }

  deletePlayer(player: Player): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${this.helperService.baseUrl}/players/${player.nick}`);
  }

}
