import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {

  forms: FormGroup;

  constructor(  private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private helperService: HelperService ) { }

  ngOnInit() {
    this.forms = this.formBuilder.group({
      nick: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
      password: [ null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ] ],
    });
  }

  onSubmit() {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.authenticate(this.forms.value);
    }
  }

  authenticate(values) {
    console.log(values);
    this.authService.authenticate(values)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setToken(response.data);
        this.authService.authUser.next(response.data);
        this.router.navigate(['game']);
      },
      (err: any) => {
        console.log(err);
        this.helperService.persistAlert('Erro ao tentar acessar o sistema. Veja se errou sua senha, se não deu muito ruim. xD');
      }  
    )
  }

}
