import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { GameCreateModalPage } from './game-create-modal/game-create-modal.page';
import { GameService } from './game.service';
import { AuthService } from './../auth/auth.service';
import { Token, Game, HttpSuccessResponse, Player } from '../shared/interface';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit {

  token: Token = null;
  authUserSubscription: Subscription;
  games: Game[];

  constructor(  private gameService: GameService,
                private authService: AuthService,
                private playerService: PlayerService,
                private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe(
      (response: HttpSuccessResponse) => {
        this.games = response.data;
      },  
      (err: HttpErrorResponse) => { }
    );
  }
  
  gameModal(): void {
    this.playerService.getPlayers().subscribe(
      (response: HttpSuccessResponse) => {
        this.presentGameCreateModal(response.data)
      },  
      (err: HttpErrorResponse) => { }
    );
  }

  async presentGameCreateModal(players: Player[]) {
    const modal = await this.modalController.create({
      component: GameCreateModalPage,
      componentProps: {
        players: players
      }
    });
    modal.onWillDismiss().then(
      () => this.getGames()
    );
    return await modal.present();
  }

}
