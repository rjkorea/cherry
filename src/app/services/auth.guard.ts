import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate() {
    if(localStorage.getItem('csk')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
