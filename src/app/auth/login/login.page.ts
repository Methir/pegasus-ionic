import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { HelperService } from '../../shared/helper.service';
import { HttpSuccessResponse } from '../../shared/interface';

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

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.forms.invalid) {
      this.helperService.persistAlert('Erro no formulário!');
    } else {
      this.authenticate(this.forms.value);
    }
  }

  authenticate(values): void {
    this.authService.authenticate(values)
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.authService.setToken(response.data);
        this.authService.authUser.next(response.data);
        this.router.navigate(['game']);
      },
      (err: HttpErrorResponse) => { }  
    )
  }

}
