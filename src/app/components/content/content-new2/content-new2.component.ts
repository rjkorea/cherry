import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { ModalService } from '../../../services/modal.service';
import { SingleDateComponent } from 'app/components/common/calendar/single-date/single-date.component';
import { ModalBottomComponent } from 'app/components/common/popup/modal-bottom/modal-bottom.component';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  images = ['', '', '', '', '', ''];
  maxByte120 = 120;
  limitByte = 0;
  fromDate = '';
  toDate = '';

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
    hostName: ''
  };

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe
  ) {
    this.modalService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.modalService.getData();

      if (type === 'from') {
        this.fromDate = date;
      } else {
        this.toDate = date;
      }
    });
  }

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

  openCalendar(type): void {
    this.modalService.setData(type);
    this.modalService.setView(this.viewContainerRef);
    this.modalService.add(ModalBottomComponent, SingleDateComponent);
  }
}
