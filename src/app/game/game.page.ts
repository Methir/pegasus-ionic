import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { GameCreateModalPage } from './game-create-modal/game-create-modal.page';
import { GameService } from './game.service';
import { AuthService } from './../auth/auth.service';
import { Token, Game, HttpSuccessResponse } from '../shared/interface';

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
                private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(
      (response: HttpSuccessResponse) => {
        this.games = response.data;
      },  
      (err: HttpErrorResponse) => { }
    )
  }
  
  async presentGameCreateModal() {
    const modal = await this.modalController.create({
      component: GameCreateModalPage
    });
    return await modal.present();
  }

}
