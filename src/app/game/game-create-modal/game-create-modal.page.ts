import { HelperService } from './../../shared/helper.service';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({  
  selector: 'app-game-create-modal',
  templateUrl: './game-create-modal.page.html',
})
export class GameCreateModalPage implements OnInit {

  constructor(private modalController: ModalController,
              private helperService: HelperService,
              private gameService: GameService) { }

  ngOnInit() {
  }

  resetGames() {
    this.gameService.resetGames()
    .subscribe(
      (response) => {
        this.helperService.persistAlert("Jogos resetados com sucesso!");
      },
      (err) => { 
        this.helperService.persistAlert("Erro ao tentar resetar os jogos!");
      }
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
