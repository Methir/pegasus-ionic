import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
})
export class PlayerPage implements OnInit {

  token: any = null;
  authUserSubscription: Subscription;
  players: any[];

  constructor(private playerService: PlayerService,
              private authService: AuthService) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(
      (players) => {
        console.log(players)
        this.players = players;
      },  
      (err) => {
        console.log(err)
      }
    )
  }

}
