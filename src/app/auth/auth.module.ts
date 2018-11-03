import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { UserPage } from './user/user.page';
import { UserUpdateModalPage } from './user/user-update-modal/user-update-modal.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'user',
    component: UserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    RegisterPage,
    UserUpdateModalPage
  ],
  declarations: [
    LoginPage,
    UserPage,
    RegisterPage,
    UserUpdateModalPage
  ]
})
export class AuthModule {}
