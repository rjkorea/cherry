import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { ModalService } from '../../../services/modal.service';
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

  imgBackground: Object;
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
        this.mFromDate.nativeElement.value = date;
        this.pcFromDate.nativeElement.value = date;
      } else {
        this.mToDate.nativeElement.value = date;
        this.pcToDate.nativeElement.value = date;
      }
    });
  }

  ngOnInit() {
  }

  changeImage(o): void {
    const file = o.srcElement.files;
    // const reader = new FileReader();

    // reader.readAsDataURL(file[0]);
    // reader.onload = () => {
    //   this.imgBackground = {
    //     'background': `url(${reader.result})`,
    //     'background-size': 'contain',
    //     'background-repeat': 'no-repeat',
    //     'background-position': 'center'
    //   };
    // };

    if (file) {
      this.modalService.setView(this.viewContainerRef);
      this.modalService.add(ModalCenterComponent, ContentCropperComponent);
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
    this.modalService.setData(when);
    this.modalService.setView(this.viewContainerRef);

    if (type === 'm') {
      this.modalService.add(ModalBottomComponent, SingleDateComponent);
    } else {
      this.modalService.add(ModalCenterComponent, SingleDateComponent);
    }
  }
}
