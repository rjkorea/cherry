import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NotificationsService]
})
export class LoginComponent implements OnInit {
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
    console.log('init login component');
    this.authService.logout();
  }

  login() {
    console.log('clicked login');
    this.authService.login(this.model.email, this.model.password)
      .subscribe(
        response => {
          this.router.navigate(['/home']);
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
