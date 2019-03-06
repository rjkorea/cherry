import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.css']
})
export class TicketBoxComponent implements OnInit {
  maxByte40: number = 40;

  constructor() { }

  ngOnInit() {
  }

}
