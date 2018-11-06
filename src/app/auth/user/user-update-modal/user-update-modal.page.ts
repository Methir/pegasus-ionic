import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { HelperService } from './../../../shared/helper.service';
import { UserService } from '../user.service';
import { User, HttpSuccessResponse } from '../../../shared/interface';

@Component({ 
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.page.html',
})
export class UserUpdateModalPage implements OnInit {

  user: User;
  forms: FormGroup;

  constructor(  private modalController: ModalController,
                private userService: UserService,
                private formBuilder: FormBuilder, 
                private helperService: HelperService ) { }

  ngOnInit(): void {
    this.forms = this.formBuilder.group({
      nick: [ this.user.nick, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
      name: [ this.user.name, [
        Validators.required,
        Validators.maxLength(255),
      ] ],
      email: [ this.user.email, [
        Validators.required,
        Validators.email
      ] ],
      password: [ this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ]
    });
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.updateUser(this.forms.value);
    }
  }

  updateUser(user: User): void {
    this.userService.updateUser(user)
    .subscribe( 
      (response: HttpSuccessResponse) => {
        this.helperService.persistAlert('Usuário atualizado com sucesso');
        this.dismiss();
      },
      (err: any) => {
        this.helperService.persistAlert('Erro ao tentar acessar o sistema. Veja se errou algo, se não deu muito ruim. xD');
      }  
    )
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
