import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  debug: boolean;
  userAgent: any;
  vendor: any;
  vendorSub: any;

  constructor(private router: Router) { }

  ngOnInit() {
    window.addEventListener('offline', function (e) {
      alert('인터넷 연결이 끊겼습니다.');
      console.log('offline');
    });

    this.debug = environment.debug;
    // get navigator info
    if (this.debug) {
      this.userAgent = navigator.userAgent;
      this.vendor = navigator.vendor;
      this.vendorSub = navigator.vendorSub;
      console.log(navigator);
    };
  }

}
