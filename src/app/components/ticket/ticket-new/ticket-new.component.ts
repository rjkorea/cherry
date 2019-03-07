import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/services/ticket.service';
import { PopupService } from 'app/services/popup.service';
import { TicketBoxComponent } from '../ticket-box/ticket-box.component';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {
  @ViewChild('ticketBoxs', { read: ViewContainerRef }) ticketBoxs: ViewContainerRef;

  contentId: string;
  maxTickets10: number = 10;
  isMaxTickets: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
  }

  getTicketBox(type): void {
    if (this.maxTickets10 > this.popupService.dynamicContentCount) {
      this.popupService.addDynamicContainer(this.ticketBoxs, TicketBoxComponent);
    } else {
      this.isMaxTickets = true;
    }
  }
}
