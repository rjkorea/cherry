import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({property: 'og:title', content: '세상의 모든 즐거움을 티킷하다'});
    this.meta.addTag({property: 'og:image', content: 'http://www.tkit.me/images/opengraph.jpg'});
    this.meta.addTag({property: 'og:url', content: 'http://host.tkit.me'});
    this.meta.addTag({property: 'og.type', content: 'website'});
  }
}
