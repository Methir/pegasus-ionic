import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { HelperService } from './../../shared/helper.service';
import { GameService } from './../game.service';
import { HttpSuccessResponse, Player, Game } from '../../shared/interface';

@Component({  
  selector: 'app-game-create-modal',
  templateUrl: './game-create-modal.page.html',
})
export class GameCreateModalPage implements OnInit {

  forms: FormGroup;
  players: Player[];

  constructor(  private modalController: ModalController,
                private helperService: HelperService,
                private formBuilder: FormBuilder, 
                private gameService: GameService  ) { }

  ngOnInit(): void {
    console.log(this.players);
    this.forms = this.formBuilder.group({
      player1: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ] ],
      deck1: [ null, [
        Validators.required,
        Validators.maxLength(25)
      ] ],
      player2: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ] ],      
      deck2: [ null, [
        Validators.required,
        Validators.maxLength(25)
      ] ],
      winner: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ] ],
      stars: [ null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ] ]
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.createGame(this.forms.value);
    }
  }

  createGame(game: Game): void {
    this.gameService.createGame(this.forms.value)
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.helperService.persistAlert("Jogo Salvo com sucesso!");
        this.dismiss();
      },
      (err: HttpErrorResponse) => { }
    );
  }

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
