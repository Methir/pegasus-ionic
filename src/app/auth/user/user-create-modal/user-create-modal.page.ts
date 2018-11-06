import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { HelperService } from './../../../shared/helper.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.page.html',
})
export class UserCreateModalPage implements OnInit {

  forms: FormGroup;

  constructor(  private modalController: ModalController,
                private userService: UserService,
                private formBuilder: FormBuilder, 
                private helperService: HelperService ) { }

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
      email: [ null, [
        Validators.required,
        Validators.email
      ] ],
      password: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ]
    });
  }

  onSubmit() {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.createUser(this.forms.value);
    }
  }

  createUser(values) {
    console.log(values);
    this.userService.createUser(values)
    .subscribe( 
      (response: any) => {
        this.helperService.persistAlert('Usuário cadastrado com sucesso');
        this.dismiss();
      },
      (err: any) => {
        this.helperService.persistAlert('Erro ao tentar acessar o sistema. Veja se errou algo, se não deu muito ruim. xD');
      }  
    )
  }

  dismiss() {
    this.modalController.dismiss();
  }

}