import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.debug = environment.debug;
    // get navigator info
    if (this.debug) {
      this.userAgent = navigator.userAgent;
      this.vendor = navigator.vendor;
      this.vendorSub = navigator.vendorSub;
      console.log(navigator);

      window.addEventListener('offline', function(e) {
        console.log('offline');
      });

      window.addEventListener('online', function(e) {
        console.log('online');
      });
    };
  }

}
