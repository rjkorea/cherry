import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'app/services/modal.service';

@Component({
  selector: 'app-single-date',
  templateUrl: './single-date.component.html',
  styleUrls: ['./single-date.component.css']
})
export class SingleDateComponent implements OnInit {
  @ViewChild('singleDate') singleDate: ElementRef;

  selectedMoment = new Date();

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  getMoment(): void {
    const selected = this.singleDate['selected'];

    if (selected) {
      this.modalService.setSubject(selected);
      // this.clear();
    }
  }

  clear(): void {
    this.modalService.clearModal();
  }
}
