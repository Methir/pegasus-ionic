import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayerPage } from './player.page';
import { PlayerCreateModalPage } from './player-create-modal/player-create-modal.page';
import { PlayerUpdateModalPage } from './player-update-modal/player-update-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerPage
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
    PlayerCreateModalPage,
    PlayerUpdateModalPage
  ],
  declarations: [
    PlayerPage,
    PlayerCreateModalPage,
    PlayerUpdateModalPage
  ]
})
export class PlayerPageModule {}
