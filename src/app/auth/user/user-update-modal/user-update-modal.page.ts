import { HelperService } from './../../../shared/helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

@Component({ 
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.page.html',
})
export class UserUpdateModalPage implements OnInit {

  user: any;
  forms: FormGroup;

  constructor(  private modalController: ModalController,
                private authService: AuthService,
                private formBuilder: FormBuilder, 
                private helperService: HelperService ) { }

  ngOnInit() {
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

  onSubmit() {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.updateUser(this.forms.value);
    }
  }

  updateUser(values) {
    console.log(values);
    this.authService.updateUser(values)
    .subscribe( 
      (response: any) => {
        this.helperService.persistAlert('Usuário atualizado com sucesso');
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
