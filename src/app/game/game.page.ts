import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit {

  games: any[];

  constructor(private gameService: GameService) { }

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
