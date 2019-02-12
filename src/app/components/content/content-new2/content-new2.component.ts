import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { PopupService } from '../../../services/popup.service';
import { SingleDateComponent } from '../../../components/common/calendar/single-date/single-date.component';
import { ModalCenterComponent } from '../../../components/common/popup/modal-center/modal-center.component';
import { ModalBottomComponent } from '../../../components/common/popup/modal-bottom/modal-bottom.component';
import { DateTimeFormatPipe } from '../../../pipes/datetime.pipe';
import { ContentCropperComponent } from './content-cropper/content-cropper.component';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  @ViewChild('mFromDate') mFromDate: ElementRef;
  @ViewChild('pcFromDate') pcFromDate: ElementRef;
  @ViewChild('mToDate') mToDate: ElementRef;
  @ViewChild('pcToDate') pcToDate: ElementRef;

  croppedImg = '';
  images = ['', '', '', '', '', ''];
  maxByte120 = 120;
  limitByte = 0;
  isCoverPopup = false;

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
    private PopupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe
  ) {
    this.PopupService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.PopupService.getData();

      if (type === 'from') {
        this.mFromDate.nativeElement.value = date;
        this.pcFromDate.nativeElement.value = date;
      } else {
        this.mToDate.nativeElement.value = date;
        this.pcToDate.nativeElement.value = date;
      }
    });

    this.PopupService.endSubject.subscribe(res => {
      this.croppedImg = res;
    });
  }

  ngOnInit() {
  }

  changeImage(o, type): void {
    const file = o.srcElement.files;

    if (file) {
      this.PopupService.setData(o);

      if (type === 'm') {
        this.controlCoverPopup(true);
      } else {
        this.PopupService.setView(this.viewContainerRef);
        this.PopupService.add(ModalCenterComponent, ContentCropperComponent);
      }
    }
  }

  checkBytes(input, output): void {
    const byte = utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte120) {
      input.value = input.value.slice(0, this.limitByte);
    } else {
      this.limitByte = output.innerText = byte;
    }
  }

  openCalendar(type, when): void {
    this.PopupService.setData(when);
    this.PopupService.setView(this.viewContainerRef);

    if (type === 'm') {
      this.PopupService.add(ModalBottomComponent, SingleDateComponent);
    } else {
      this.PopupService.add(ModalCenterComponent, SingleDateComponent);
    }
  }

  controlCoverPopup(bool: boolean): void {
    this.isCoverPopup = bool;
  }
}
