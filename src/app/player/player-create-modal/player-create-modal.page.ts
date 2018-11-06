import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { PlayerService } from '../player.service';
import { HelperService } from './../../shared/helper.service';

@Component({  
  selector: 'app-player-create-modal',
  templateUrl: './player-create-modal.page.html',
})
export class PlayerCreateModalPage implements OnInit {

  forms: FormGroup;

  constructor(  private modalController: ModalController,
                private playerService: PlayerService,
                private formBuilder: FormBuilder, 
                private helperService: HelperService  ) { }

  ngOnInit() {
    this.forms = this.formBuilder.group({
      nick: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
      name: [ null, [
        Validators.required,
        Validators.maxLength(255),
      ] ],
      stars: [ 2, [
        Validators.required
      ] ]
    });
  }

  onSubmit() {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.createPlayer(this.forms.value);
    }
  }

  createPlayer(values) {
    this.playerService.createPlayer(values)
    .subscribe(
      (response) => {
        this.helperService.persistAlert('Jodador cadastrado com sucesso');
      },
      (err) => {
        this.helperService.persistAlert('Erro ao tentar cadastrar jodador!');
      }
    );
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
