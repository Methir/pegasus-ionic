import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { UserUpdateModalPage } from './user-update-modal/user-update-modal.page';
import { UserCreateModalPage } from './user-create-modal/user-create-modal.page';

const routes: Routes = [
  {
    path: '',
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
    UserPage,
    UserCreateModalPage,
    UserUpdateModalPage
  ]
})
export class UserModule {}
