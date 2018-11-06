import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login/login.page';
import { UserPage } from './user/user.page';
import { UserUpdateModalPage } from './user/user-update-modal/user-update-modal.page';
import { UserCreateModalPage } from './user/user-create-modal/user-create-modal.page';

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
    UserCreateModalPage,
    UserUpdateModalPage
  ],
  declarations: [
    LoginPage,
    UserPage,
    UserCreateModalPage,
    UserUpdateModalPage
  ]
})
export class AuthModule {}
