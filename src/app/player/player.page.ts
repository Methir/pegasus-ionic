import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { HelperService } from './../shared/helper.service';
import { AuthService } from './../auth/auth.service';
import { PlayerService } from './player.service';
import { PlayerCreateModalPage } from './player-create-modal/player-create-modal.page';
import { PlayerUpdateModalPage } from './player-update-modal/player-update-modal.page';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
})
export class PlayerPage implements OnInit {

  token: any = null;
  authUserSubscription: Subscription;
  players: any[];

  constructor(  private playerService: PlayerService,
                private authService: AuthService, 
                private helperService: HelperService,
                private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      (response) => {
        console.log(response)
        this.players = response.data;
      },  
      (err) => {
        console.log(err)
      }
    );
  }

  deletePlayer(player: any) {
    this.playerService.deletePlayer(player)
    .subscribe(
      (response) => {
        this.helperService.persistAlert("Jogador deletado com sucesso!");
        this.getPlayers();
      },
      (err) => {
        this.helperService.persistAlert("Falha ao deletar jogador!");
      }
    );
  }

  async presentPlayerCreateModal() {
    const modal = await this.modalController.create({
      component: PlayerCreateModalPage
    });
    modal.onWillDismiss().then(() => this.getPlayers());
    return await modal.present();
  }

  async presentPlayerUpdateModal(player) {
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
