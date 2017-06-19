import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: []
})
export class SignupComponent implements OnInit {
  model: any = {};
  notification_options: Object;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
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
          console.log(error);
        }
      );
  }

}
