import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
})
export class PlayerPage implements OnInit {

  players: any[];

  constructor(private playerService: PlayerService) { }

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
