import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopupService } from '../../../../services/popup.service';

@Component({
  selector: 'app-single-date',
  templateUrl: './single-date.component.html',
  styleUrls: ['./single-date.component.css']
})
export class SingleDateComponent implements OnInit {
  @ViewChild('singleDate') singleDate: ElementRef;
  @ViewChild('doneBtn') doneBtn: ElementRef;

  type: string;
  limitDate: Date = new Date();
  selectedDate: Date = new Date();

  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.type = this.popupService.getData();
    this.getMoment();
  }

  getMoment(): void {
    if (this.type === 'from') {
      this.limitDate = new Date();
    } else {
      const date = localStorage.getItem('temp_from_date');
      this.selectedDate = date !== null || undefined ? new Date(date) : new Date();
      this.limitDate = this.selectedDate;
    }
  }

  setMoment(): void {
    this.selectedDate = this.singleDate['selected'];

    if (this.type === 'from') localStorage.setItem('temp_from_date', this.selectedDate.toString());

    if (this.selectedDate) {
      this.popupService.setSubject(this.selectedDate);
      this.clear();
    }
  }

  clear(): void {
    this.popupService.clearPopup();
  }
}
