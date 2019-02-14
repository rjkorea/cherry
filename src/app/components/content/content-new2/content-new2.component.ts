import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { PopupService } from '../../../services/popup.service';
import { SingleDateComponent } from '../../../components/common/calendar/single-date/single-date.component';
import { ModalCenterComponent } from '../../../components/common/popup/modal-center/modal-center.component';
import { ModalBottomComponent } from '../../../components/common/popup/modal-bottom/modal-bottom.component';
import { DateTimeFormatPipe } from '../../../pipes/datetime.pipe';
import { ContentCropperComponent } from './content-cropper/content-cropper.component';
import { ContentIsPublicComponent } from './content-is-public/content-is-public.component';
import { ContentPlaceMapComponent } from './content-place-map/content-place-map.component';
import { ObjectOrientedRenderer3 } from '@angular/core/src/render3/renderer';

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

  utils = utils;
  maxByte40 = 40;
  limitByte = 0;
  isCoverPopup = false;
  typeCoverPopup = '';
  croppedImg = '';
  croppedImgSize = 0;
  thumnails = ['', '', '', '', '', ''];

  placeObj: Object;
  placeX = 0;
  placeY = 0;
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

    this.popupService.nameSubject.subscribe(res => {
      if (res.name === 'cropper') {
        this.croppedImg = res.value['base64'];
        this.croppedImgSize = res.value['file']['size'];
      } else if (res.name === 'map') {
        this.placeObj = res.value;
        this.placeX = Number.parseFloat(this.placeObj['x']);
        this.placeY = Number.parseFloat(this.placeObj['y']);
      }
    });
  }

  ngOnInit() {
  }

  changeMainImg(o, type): void {
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

  openDescriptionPopup(name): void {
    this.popupService.setView(this.viewContainerRef);

    if (name === 'isPublic') {
      this.popupService.add(ModalCenterComponent, ContentIsPublicComponent);
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

  openPlaceMap(type): void {
    if (type === 'm') {
      this.controlCoverPopup(true, 'map');
    } else {
      this.popupService.setView(this.viewContainerRef);
      this.popupService.add(ModalCenterComponent, ContentPlaceMapComponent);
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }
 
  changeExtraImg(o, idx): void {
    const file = o.srcElement.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.thumnails[idx] = reader.result.toString();
      }
    }
  }

  removeExtraImg(idx): void {
    this.thumnails[idx] = '';
  }
}
