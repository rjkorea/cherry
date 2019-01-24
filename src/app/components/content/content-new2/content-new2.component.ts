import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  previewData = {
    isHidden: false,
    name: '',
    tags: [],
    mainImg: '',
    place: '',
    startDate: '',
    endDate: '',
    notice: '',
    desc: '',
    images: [],
    hostName: 'VU Entertainment'
  };

  constructor() { }

  ngOnInit() {
  }
}
