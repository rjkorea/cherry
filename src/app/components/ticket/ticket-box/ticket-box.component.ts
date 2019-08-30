import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';
import { AuthService } from '../../../services/auth.service';
import { utilModule } from '../../../shared/utils';
import { ModalCenterComponent } from '../../common/popup/modal-center/modal-center.component';
import { TicketSpreadComponent } from './ticket-spread/ticket-spread.component';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';
import { ModalBottomComponent } from 'app/components/common/popup/modal-bottom/modal-bottom.component';
import { SingleDateComponent } from 'app/components/common/calendar/single-date/single-date.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.css']
})
export class TicketBoxComponent implements OnInit, OnChanges {
  @ViewChild('name') nameInput: ElementRef;
  @ViewChild('desc') descInput: ElementRef;
  @ViewChild('byte') byteInput: ElementRef;
  @ViewChild('byte02') byte02Input: ElementRef;
  @ViewChild('ticketPrice') ticketPrice: ElementRef;
  @Input() isEdit: boolean;
  @Input() editData: Observable<Object>;

  utils = utilModule;
  box: any;
  boxIndex: number;
  parentData: any;
  maxByte40: number = 40;
  maxByte60: number = 60;
  limitLength: number = 0;
  previousTicketCnt: number = 0;
  isSpread: boolean = false;

  ticketForm = this.formBuilder.group({
    type: new FormControl(''),
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
    ticketSpread: new FormControl(''),
    isCoupon: new FormControl(''),
    duplicatedRegistration: new FormControl(''),
    disabledSend: new FormControl(''),
    showPrice: new FormControl(''),
    enabledDesc: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe,
    private route: ActivatedRoute
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
    this.previousTicketCnt = this.route.snapshot.params['previous'] || 0;
  }

  ngOnChanges() {
    if (this.isEdit) this.getThisTicket();
  }

  getThisTicket() {
    this.editData.subscribe(res => {
      this.setThisTicket(res[0]['data']);
    });
  }

  setThisTicket(data: Object): void {
    if (data['sales_date'].hasOwnProperty('end')) {
      this.ticketForm.controls['mToDate'].setValue(this.dateFormat.transform(data['sales_date']['end'] * 1000, 'date'));
      this.ticketForm.controls['pcToDate'].setValue(this.dateFormat.transform(data['sales_date']['end'] * 1000, 'date'));
    }

    if (data['fpfg']['spread']) {
      this.isSpread = true;
      this.ticketForm.controls['ticketSpread'].setValue(data['fpfg']['spread']);
    }

    if (data['type'] === 'coupon') {
      this.ticketForm.controls['isCoupon'].setValue(true);
    } else {
      this.ticketForm.controls['isCoupon'].setValue(false);
    }

    this.parentData = { ticketType: data['price'] > 0 ? 'pay' : 'free' };

    this.ticketForm.controls['type'].setValue(data['type']);
    this.ticketForm.controls['ticketName'].setValue(data['name']);
    this.ticketForm.controls['ticketDesc'].setValue(data['desc']['value']);
    this.ticketForm.controls['ticketPrice'].setValue(data['price']);
    this.ticketForm.controls['ticketCount'].setValue(data['sales']['limit']);
    this.ticketForm.controls['fromHours'].setValue(this.dateFormat.transform(data['sales_date']['start'] * 1000, 'hours'));
    this.ticketForm.controls['fromMins'].setValue(this.dateFormat.transform(data['sales_date']['start'] * 1000, 'mins'));
    this.ticketForm.controls['toHours'].setValue(this.dateFormat.transform(data['sales_date']['end'] * 1000, 'hours'));
    this.ticketForm.controls['toMins'].setValue(this.dateFormat.transform(data['sales_date']['end'] * 1000, 'mins'));
    this.ticketForm.controls['mFromDate'].setValue(this.dateFormat.transform(data['sales_date']['start'] * 1000, 'date'));
    this.ticketForm.controls['pcFromDate'].setValue(this.dateFormat.transform(data['sales_date']['start'] * 1000, 'date'));
    this.ticketForm.controls['duplicatedRegistration'].setValue(data['duplicated_registration']);
    this.ticketForm.controls['disabledSend'].setValue(data['disabled_send']);
    this.ticketForm.controls['showPrice'].setValue(data['show_price']);
    this.ticketForm.controls['enabledDesc'].setValue(data['desc']['enabled']);

    this.checkBytes(this.nameInput.nativeElement, this.byteInput.nativeElement, 40);
    this.checkBytes(this.descInput.nativeElement, this.byte02Input.nativeElement, 60);
  }

  checkBytes(input, output, max): void {
    const byte = this.utils.getByteSize(input.value, 0, 0);
    const maxByte = max === 40 ? this.maxByte40 : this.maxByte60;

    if (byte > maxByte) {
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
    this.popupService.dynamicContents[this.boxIndex] = null;
    this.box.destroy();
  }

  openDescriptionPopup(name): void {
    this.popupService.setView(this.viewContainerRef);

    if (name === 'spread') {
      this.popupService.add(ModalCenterComponent, TicketSpreadComponent);
    }
  }
}
