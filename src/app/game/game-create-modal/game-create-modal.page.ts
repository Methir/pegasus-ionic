import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { HelperService } from './../../shared/helper.service';
import { GameService } from './../game.service';
import { HttpSuccessResponse } from '../../shared/interface';

@Component({  
  selector: 'app-game-create-modal',
  templateUrl: './game-create-modal.page.html',
})
export class GameCreateModalPage implements OnInit {

  constructor(  private modalController: ModalController,
                private helperService: HelperService,
                private gameService: GameService  ) { }

  ngOnInit(): void { }

  resetGames(): void {
    this.gameService.resetGames()
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.helperService.persistAlert("Jogos resetados com sucesso!");
        this.dismiss();
      },
      (err: HttpErrorResponse) => { }
    );
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
