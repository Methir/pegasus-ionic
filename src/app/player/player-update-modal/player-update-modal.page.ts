import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { PlayerService } from '../player.service';
import { HelperService } from './../../shared/helper.service';
import { Player, HttpSuccessResponse } from '../../shared/interface';

@Component({  
  selector: 'app-player-update-modal',
  templateUrl: './player-update-modal.page.html',
})
export class PlayerUpdateModalPage implements OnInit {
 
  player: Player;
  forms: FormGroup;

  constructor(  private modalController: ModalController,
                private playerService: PlayerService,
                private formBuilder: FormBuilder, 
                private helperService: HelperService  ) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      nick: [ this.player.nick, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
      name: [ this.player.name, [
        Validators.required,
        Validators.maxLength(255),
      ] ],
      stars: [ this.player.stars, [
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
      this.updatePlayer(this.forms.value);
    }
  }

  updatePlayer(player: Player): void {
    this.playerService.updatePlayer(player)
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.dismiss();
        this.helperService.persistAlert('Jodador atualizado com sucesso!');
      },
      (err) => {
        this.helperService.persistAlert('Erro ao tentar atualizar jodador!');
      }
    );
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
