import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';
import { utilModule } from '../../../shared/utils';
import { ModalCenterComponent } from '../../common/popup/modal-center/modal-center.component';
import { TicketSpreadComponent } from './ticket-spread/ticket-spread.component';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';
import { ModalBottomComponent } from 'app/components/common/popup/modal-bottom/modal-bottom.component';
import { SingleDateComponent } from 'app/components/common/calendar/single-date/single-date.component';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.css']
})
export class TicketBoxComponent implements OnInit {
  utils = utilModule;
  box: any;
  boxIndex: number;
  parentData: Object;
  maxByte40: number = 40;
  limitLength: number = 0;
  isSpread: boolean = false;

  ticketForm = this.formBuilder.group({
    ticketName: new FormControl('', [Validators.required]),
    ticketDesc: new FormControl('', [Validators.required]),
    fromHours: new FormControl('', [Validators.required]),
    fromMins: new FormControl('', [Validators.required]),
    toHours: new FormControl('', [Validators.required]),
    toMins: new FormControl('', [Validators.required]),
    mFromDate: new FormControl(''),
    pcFromDate: new FormControl(''),
    mToDate: new FormControl(''),
    pcToDate: new FormControl(''),
    ticketPrice: new FormControl(''),
    ticketCount: new FormControl(''),
    ticketSpread: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe,
  ) {
    this.popupService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.popupService.getData();

      if (type === 'from') {
        this.ticketForm.controls['mFromDate'].setValue(date);
        this.ticketForm.controls['pcFromDate'].setValue(date);
      } else {
        this.ticketForm.controls['mToDate'].setValue(date);
        this.ticketForm.controls['pcToDate'].setValue(date);
      }
    });
  }

  ngOnInit() {
  }

  checkBytes(input, output): void {
    const byte = this.utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte40) {
      input.value = input.value.slice(0, this.limitLength);
    } else {
      this.limitLength = input.value.length;
      output.innerText = byte;
    }
  }

  openCalendar(type, when, input): void {
    this.popupService.setData(when);
    this.popupService.setView(this.viewContainerRef);

    if (type === 'm') {
      this.popupService.add(ModalBottomComponent, SingleDateComponent);
    } else {
      this.popupService.add(ModalCenterComponent, SingleDateComponent);
    }

    input.blur();
  }

  clickUseSpread() {
    this.isSpread = true;
  }

  deleteTicket(): void {
    this.popupService.dynamicContentCount--;
    this.popupService.dynamicContents = this.popupService.dynamicContents.slice(this.boxIndex, 1);
    this.box.destroy();
  }

  openDescriptionPopup(name): void {
    this.popupService.setView(this.viewContainerRef);

    if (name === 'spread') {
      this.popupService.add(ModalCenterComponent, TicketSpreadComponent);
    }
  }
}
