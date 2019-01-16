import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-done',
  templateUrl: './signup-done.component.html',
  styleUrls: ['./signup-done.component.css'],
  providers: []
})
export class SignupDoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  goLogin() {
    this.router.navigate(['/login']);
  }

}
