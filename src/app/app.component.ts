import { Component, OnInit, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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

  constructor(private meta: Meta) { }

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
    }

    // set meta property
    this.meta.addTag({property: 'og:title', content: '세상의 모든 즐거움을 티킷하다'});
    this.meta.addTag({property: 'og:image', content: 'http://www.tkit.me/images/opengraph.jpg'});
    this.meta.addTag({property: 'og:url', content: 'http://host.tkit.me'});
    this.meta.addTag({property: 'og:type', content: 'website'});

  }

}
