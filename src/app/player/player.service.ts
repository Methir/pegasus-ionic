import { HelperService } from './../shared/helper.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private helperService: HelperService,
              private http: HttpClient ) { }

  getPlayers(): Observable<any> {
    return this.http.get(`${this.helperService.baseUrl}/players`)
  }

}
