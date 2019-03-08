import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';
import { utilModule } from '../../../shared/utils';
import { ModalCenterComponent } from '../../common/popup/modal-center/modal-center.component';
import { TicketSpreadComponent } from './ticket-spread/ticket-spread.component';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.css']
})
export class TicketBoxComponent implements OnInit {
  utils = utilModule;
  box: any;
  parentData: Object;
  maxByte40: number = 40;

  ticketForm = this.formBuilder.group({
    isPrivate: new FormControl(''),
    contentsName: new FormControl('', [Validators.required]),
    fromHours: new FormControl('', [Validators.required]),
    fromMins: new FormControl('', [Validators.required]),
    toHours: new FormControl('', [Validators.required]),
    toMins: new FormControl('', [Validators.required]),
    mFromDate: new FormControl(''),
    pcFromDate: new FormControl(''),
    mToDate: new FormControl(''),
    pcToDate: new FormControl(''),
    exhibition: new FormControl(''),
    coupon: new FormControl(''),
    play: new FormControl(''),
    seminar: new FormControl(''),
    concert: new FormControl(''),
    invitation: new FormControl(''),
    festival: new FormControl(''),
    wedding: new FormControl(''),
    club: new FormControl(''),
    etc: new FormControl(''),
    siteUrl: new FormControl(''),
    videoUrl: new FormControl(''),
    notice: new FormControl(''),
    description: new FormControl(''),
    commentsPrivate: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  deleteTicket(): void {
    this.popupService.dynamicContentCount--;
    this.box.destroy();
  }

  openDescriptionPopup(name): void {
    this.popupService.setView(this.viewContainerRef);

    if (name === 'spread') {
      this.popupService.add(ModalCenterComponent, TicketSpreadComponent);
    }
  }
}
