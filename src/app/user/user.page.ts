import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { UserUpdateModalPage } from './user-update-modal/user-update-modal.page';
import { HelperService } from './../shared/helper.service';
import { UserCreateModalPage } from './user-create-modal/user-create-modal.page';
import { UserService } from './user.service';
import { User, Token, HttpSuccessResponse } from '../shared/interface';
import { AuthService } from '../auth/auth.service';

@Component({  
  selector: 'app-user',
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  
  token: Token = null;
  authUserSubscription: Subscription;
  users: User[];

  constructor(  private userService: UserService,
                private authService: AuthService,
                private modalController: ModalController,
                private helperService: HelperService  ) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);
  } 

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.users = response.data;
      },
      (err: HttpErrorResponse) => { }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
    .subscribe(
      (response: HttpSuccessResponse) => {
        this.helperService.persistAlert("Usuário deletado com sucesso!");
        this.getUsers();
      },
      (err: HttpErrorResponse) => { }
    );
  }

  async presentCreateUserModal() {
    const modal = await this.modalController.create({
      component: UserCreateModalPage
    });
    modal.onWillDismiss().then(() => this.getUsers());
    return await modal.present();
  }

  async presentUpdateUserModal(user: User) {
    const modal = await this.modalController.create({
      component: UserUpdateModalPage,
      componentProps: {
        user: user
      }
    });
    modal.onWillDismiss().then(() => this.getUsers());
    return await modal.present();
  }

}
