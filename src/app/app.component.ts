import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Jogos',
      url: '/game',
      icon: 'home'
    },
    {
      title: 'Jogadores',
      url: '/player',
      icon: 'list'
    },
    {
      title: 'Registrar',
      url: '/auth/register',
      icon: 'person-add'
    },
    {
      title: 'Entrar',
      url: '/auth/login',
      icon: 'key'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
