import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl: string = "http://localhost:8080";

  constructor(private toastCtrl: ToastController) { }

  async persistAlert(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      closeButtonText: 'Ok!',
      showCloseButton: true,
      duration: 5000, 
    });
    toast.present();
  }

}
