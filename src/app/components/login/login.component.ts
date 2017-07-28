import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  model: any = {};
  error_msg = '';

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.model.email.trim(), this.model.password.trim())
      .subscribe(
        response => {
          if(this.authService.getRole() === 'staff') {
            this.router.navigate(['/entrance']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.error_msg = error['message']
          console.log(this.error_msg);
        }
      );
  }

}
