import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if(localStorage.getItem('csk')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
