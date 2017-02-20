import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

}
