import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: []
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goPersonalSignup() {
    this.router.navigate(['/signup/personal']);
  }

  goBusinessSignup() {
    this.router.navigate(['/signup/business']);
  }
}
