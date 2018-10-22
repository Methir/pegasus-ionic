import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayerPage } from './player.page';
import { PlayerCreateModalPage } from './player-create-modal/player-create-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    PlayerCreateModalPage
  ],
  declarations: [
    PlayerPage,
    PlayerCreateModalPage
  ]
})
export class PlayerPageModule {}
