import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { GameService } from './game.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameCreateModalPage } from './game-create-modal/game-create-modal.page';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit {

  token: any = null;
  authUserSubscription: Subscription;

  games: any[];

  constructor(private gameService: GameService,
              private authService: AuthService,
              private modalController: ModalController  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  }

  ngOnInit() {
    this.gameService.getGames().subscribe(
      (response) => {
        console.log(response)
        this.games = response.data;
      },  
      (err) => {
        console.log(err)
      }
    )
  }
  
  async presentGameCreateModal() {
    const modal = await this.modalController.create({
      component: GameCreateModalPage
    });
    return await modal.present();
  }

}
