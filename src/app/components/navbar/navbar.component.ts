import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  getUserId() {
    return localStorage.getItem('_id');
  }

  getUserName() {
    return localStorage.getItem('name');
  }

  getUserImage() {
    return localStorage.getItem('image');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isDefaultNavbar() {
    return !this.authService.loggedIn() && !this.authService.getRole();
  }

  isSuperNavbar() {
    return this.authService.loggedIn() && this.authService.getRole() === 'super';
  }

  isAdminNavbar() {
    return this.authService.loggedIn() && this.authService.getRole() === 'admin';
  }

  isHostNavbar() {
    return this.authService.loggedIn() && this.authService.getRole() === 'host';
  }

  isStaffNavbar() {
    return this.authService.loggedIn() && this.authService.getRole() === 'staff';
  }

  isProNavbar() {
    return this.authService.loggedIn() && this.authService.getRole() === 'pro';
  }

  logout() {
    this.authService.logout();
  }

}
