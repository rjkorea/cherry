import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { ModalService } from '../../../services/modal.service';
import { SingleDateComponent } from 'app/components/common/calendar/single-date/single-date.component';
import { ModalBottomComponent } from 'app/components/common/popup/modal-bottom/modal-bottom.component';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  images = ['', '', '', '', '', ''];
  maxByte120 = 120;
  limitByte = 0;
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

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  checkBytes(input, output): void {
    const byte = utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte120) {
      input.value = input.value.slice(0, this.limitByte);
    } else {
      this.limitByte = output.innerText = byte;
    }
  }

  openCalendar(): void {
    this.modalService.setView(this.viewContainerRef);
    this.modalService.add(ModalBottomComponent, SingleDateComponent);
  }
}
