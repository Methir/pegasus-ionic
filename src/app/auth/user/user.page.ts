import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({ 
  selector: 'app-user',
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  
  token: any = null;
  authUserSubscription: Subscription;
  users: any;

  constructor(private authService: AuthService) {
    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: any) => this.token = token);
  } 

  ngOnInit() {
    this.authService.getUsers()
    .subscribe(
      (users: any) => {
        console.log(users);
        this.users = users;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
