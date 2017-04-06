import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // private isIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  getUserName() {
    return localStorage.getItem('name');
  }

  getUserImage() {
    return localStorage.getItem('image');
  }

}
