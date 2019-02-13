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
  @ViewChild('toggle') toggle: ElementRef;

  @ViewChild('mFromDate') mFromDate: ElementRef;
  @ViewChild('pcFromDate') pcFromDate: ElementRef;
  @ViewChild('mToDate') mToDate: ElementRef;
  @ViewChild('pcToDate') pcToDate: ElementRef;

  images = ['', '', '', '', '', ''];
  maxByte40 = 40;
  limitByte = 0;
  isCoverPopup = false;
  typeCoverPopup = 'cropper';
  croppedImg = '';

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
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe
  ) {
    this.popupService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.popupService.getData();

      if (type === 'from') {
        this.mFromDate.nativeElement.value = date;
        this.pcFromDate.nativeElement.value = date;
      } else {
        this.mToDate.nativeElement.value = date;
        this.pcToDate.nativeElement.value = date;
      }
    });

    this.popupService.endSubject.subscribe(res => {
      this.croppedImg = res;
    });
  }

  ngOnInit() {
  }

  getTogglePopup(name): void {
    if (name === 'isPublic') {
      this.toggle.nativeElement.classList.toggle('on');
    }
  }

  changeImage(o, type): void {
    const file = o.srcElement.files;

    if (file) {
      this.popupService.setData(o);

      if (type === 'm') {
        this.controlCoverPopup(true, 'cropper');
      } else {
        this.popupService.setView(this.viewContainerRef);
        this.popupService.add(ModalCenterComponent, ContentCropperComponent);
      }
    }
  }

  checkBytes(input, output): void {
    const byte = utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte40) {
      input.value = input.value.slice(0, this.limitByte);
    } else {
      this.limitByte = output.innerText = byte;
    }
  }

  openCalendar(type, when): void {
    this.popupService.setData(when);
    this.popupService.setView(this.viewContainerRef);

    if (type === 'm') {
      this.popupService.add(ModalBottomComponent, SingleDateComponent);
    } else {
      this.popupService.add(ModalCenterComponent, SingleDateComponent);
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }
}
