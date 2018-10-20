import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  { 
    path: 'game', 
    loadChildren: './game/game.module#GamePageModule' 
  },
  { 
    path: 'player', 
    loadChildren: './player/player.module#PlayerPageModule' 
  },
  { 
    path: 'auth', 
    loadChildren: './auth/auth.module#AuthModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
