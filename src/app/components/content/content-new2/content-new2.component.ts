import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  previewObj = {
    isHidden: false,
    name: '',
    tags: [],
    mainImg: '',
    place: '',
    date: {
      start: '',
      end: ''
    },
    notice: '',
    homepage: '',
    desc: '',
    images: []
  };

  constructor() { }

  ngOnInit() {
  }
}
