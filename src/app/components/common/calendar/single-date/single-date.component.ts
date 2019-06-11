import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../../services/popup.service';
interface CalenderData {
  when: string,
  contentDate: {
    start: number,
    end: number
  }
}

@Component({
  selector: 'app-single-date',
  templateUrl: './single-date.component.html',
  styleUrls: ['./single-date.component.css']
})
export class SingleDateComponent implements OnInit {
  @ViewChild('singleDate') singleDate: ElementRef;
  @ViewChild('doneBtn') doneBtn: ElementRef;

  type: CalenderData = {
    when: '',
    contentDate: {
      start: 0,
      end: 0
    }
  };
  minDate: any;
  maxDate: any;
  selectedDate: any;

  constructor(
    private popupService: PopupService,
  ) {
  }

  ngOnInit() {
    this.type = this.popupService.getData();
    this.getMoment();
  }

  getMoment(): void {
    if (this.type.when === 'from') {
      this.minDate = new Date(this.type.contentDate.start * 1000);
      this.maxDate = new Date(this.type.contentDate.end * 1000);
      this.selectedDate = this.minDate;
    } else {
      const date = localStorage.getItem('temp_from_date');
      this.selectedDate = date !== null || !undefined ? new Date(date) : this.minDate;
      this.maxDate = new Date(this.type.contentDate.end * 1000);
      this.minDate = this.selectedDate;
    }
  }

  setMoment(): void {
    this.selectedDate = this.singleDate['selected'];
    if (this.type.when === 'from') {
      localStorage.setItem('temp_from_date', this.selectedDate.toString());
    }

    if (this.selectedDate) {
      this.popupService.setSubject(this.selectedDate);
      this.clear();
    }
  }

  clear(): void {
    this.popupService.clearPopup();
  }
}
