import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    console.log('init login component');
    this.authService.logout();
  }

  login() {
    console.log('clicked login');
    this.authService.login(this.model.email, this.model.password)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
