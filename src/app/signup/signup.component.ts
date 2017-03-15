import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [NotificationsService]
})
export class SignupComponent implements OnInit {
  model: any = {};
  notification_options: Object;

  constructor(private router: Router,
              private simpleNotificationsService: NotificationsService,
              private authService: AuthService) { }

  ngOnInit() {
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    console.log('init signup component');
    this.authService.logout();
  }

  signup() {
    console.log('clicked signup');
    this.authService.signup(this.model.name, this.model.email, this.model.password,
                            this.model.password2, this.model.mobile_number)
      .subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

}
