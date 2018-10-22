import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit {

  token: any = null;
  authUserSubscription: Subscription;

  games: any[];

  constructor(private gameService: GameService,
              private authService: AuthService  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  }

  ngOnInit() {
    this.gameService.getGames().subscribe(
      (games) => {
        console.log(games)
        this.games = games;
      },  
      (err) => {
        console.log(err)
      }
    )
  }

}
