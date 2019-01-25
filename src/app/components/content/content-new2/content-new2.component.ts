import { Component, OnInit } from '@angular/core';
import { utils } from '../../../shared/utils';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  maxByte120 = 120;
  limitLength = 0;
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

  checkBytes(input, output): void {
    console.log(output);
    const byte = utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte120) {
      input.value = input.value.slice(0, this.limitLength);
    } else {
      this.limitLength = input.value.length;
      output.innerText = byte;
    }
  }
}
