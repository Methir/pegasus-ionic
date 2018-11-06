import { HelperService } from './../../shared/helper.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { UserUpdateModalPage } from './user-update-modal/user-update-modal.page';

@Component({ 
  selector: 'app-user',
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  
  token: any = null;
  authUserSubscription: Subscription;
  users: any;

  constructor(private authService: AuthService,
              private modalController: ModalController,
              private helperService: HelperService) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  } 

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers()
    .subscribe(
      (response: any) => {
        console.log(response);
        this.users = response.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteUser(user: any) {
    this.authService.deleteUser(user)
    .subscribe(
      (response) => {
        this.helperService.persistAlert("Usuário deletado com sucesso!");
        this.getUsers();
      },
      (err) => {
        this.helperService.persistAlert("Falha ao deletar usuário!");
      }
    );
  }

  async presentCreateUserModal() {
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    modal.onWillDismiss().then(() => this.getUsers());
    return await modal.present();
  }

  async presentUpdateUserModal(user) {
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
