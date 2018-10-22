import { ModalController } from '@ionic/angular';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { PlayerCreateModalPage } from './player-create-modal/player-create-modal.page';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
})
export class PlayerPage implements OnInit {

  token: any = null;
  authUserSubscription: Subscription;
  players: any[];

  constructor(private playerService: PlayerService,
              private authService: AuthService, 
              private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(
      (response) => {
        console.log(response)
        this.players = response.data;
      },  
      (err) => {
        console.log(err)
      }
    )
  }

  async presentPlayerCreateModal() {
    const modal = await this.modalController.create({
      component: PlayerCreateModalPage
    });
    return await modal.present();
  }

}
