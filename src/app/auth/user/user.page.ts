import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';

@Component({ 
  selector: 'app-user',
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  
  token: any = null;
  authUserSubscription: Subscription;
  users: any;

  constructor(private authService: AuthService,
              private modalController: ModalController) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  } 

  ngOnInit() {
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

  async presentRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    return await modal.present();
  }

}
