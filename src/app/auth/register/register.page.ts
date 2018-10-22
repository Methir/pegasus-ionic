import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({ 
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
