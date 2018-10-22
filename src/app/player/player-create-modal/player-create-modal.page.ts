import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({  
  selector: 'app-player-create-modal',
  templateUrl: './player-create-modal.page.html',
})
export class PlayerCreateModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
