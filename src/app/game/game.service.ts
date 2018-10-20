import { HelperService } from './../shared/helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private helperService: HelperService,
              private http: HttpClient  ) { }
 
  getGames(): Observable<any>{
    return this.http.get(`${this.helperService.baseUrl}/games`);
  }
}
