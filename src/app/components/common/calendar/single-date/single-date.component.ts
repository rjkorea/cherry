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

  background = '';

  constructor(
    private PopupService: PopupService
  ) { }

  ngOnInit() {
  }

  onSelect(): void {
    const selected = this.singleDate['selected'];

    if (selected) {
      this.background = 'btn-tkit-mint';
      this.doneBtn.nativeElement['disabled'] = false;
    }
  }

  getMoment(): void {
    const selected = this.singleDate['selected'];

    if (selected) {
      this.PopupService.setSubject(selected);
      this.clear();
    }
  }

  clear(): void {
    this.PopupService.clearPopup();
  }
}
