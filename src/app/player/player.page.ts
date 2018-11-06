import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { HelperService } from './../shared/helper.service';
import { AuthService } from './../auth/auth.service';
import { PlayerService } from './player.service';
import { PlayerCreateModalPage } from './player-create-modal/player-create-modal.page';
import { PlayerUpdateModalPage } from './player-update-modal/player-update-modal.page';
import { Token, Player, HttpSuccessResponse } from '../shared/interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
})
export class PlayerPage implements OnInit {

  token: Token = null;
  authUserSubscription: Subscription;
  players: Player[];

  constructor(  private playerService: PlayerService,
                private authService: AuthService, 
                private helperService: HelperService,
                private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: HttpSuccessResponse) => {
        this.players = response.data;
      },  
      (err: HttpErrorResponse) => { }
    );
  }

  deletePlayer(player: Player): void {
    this.playerService.deletePlayer(player)
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.helperService.persistAlert("Jogador deletado com sucesso!");
        this.getPlayers();
      },
      (err: HttpErrorResponse) => { }
    );
  }

  async presentPlayerCreateModal() {
    const modal = await this.modalController.create({
      component: PlayerCreateModalPage
    });
    modal.onWillDismiss().then(() => this.getPlayers());
    return await modal.present();
  }

  async presentPlayerUpdateModal(player: Player) {
    const modal = await this.modalController.create({
      component: PlayerUpdateModalPage,
      componentProps: {
        player: player
      }
    });
    modal.onWillDismiss().then(() => this.getPlayers());
    return await modal.present();
  }

}
