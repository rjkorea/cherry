import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  body: any;
  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  error_msg: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.body = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(this.body)
      .subscribe(
        response => {
          if (this.authService.getRole() === 'staff') {
            this.router.navigate(['/contents']);
          } else if (this.authService.getRole() === 'super') {
            this.router.navigate(['/home']);
          } else if (this.authService.getRole() === 'admin') {
            this.router.navigate(['/home']);
          } else if (this.authService.getRole() === 'host') {
            this.router.navigate(['/contents']);
          } else if (this.authService.getRole() === 'pro') {
            this.router.navigate(['/contents']);
          } else {
            this.router.navigate(['/contents']);
          }
        },
        error => {
          // this.error_msg = error['message']
          this.error_msg = '유저 정보가 일치하지 않습니다'
          console.log(this.error_msg);
        }
      );
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

}
