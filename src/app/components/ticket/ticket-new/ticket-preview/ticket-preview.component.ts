import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.css']
})
export class TicketPreviewComponent implements OnInit {
  @Input() previewData: any;

  constructor() { }

  ngOnInit() {
  }

}
