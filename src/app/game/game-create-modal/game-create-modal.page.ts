import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({  
  selector: 'app-game-create-modal',
  templateUrl: './game-create-modal.page.html',
})
export class GameCreateModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
