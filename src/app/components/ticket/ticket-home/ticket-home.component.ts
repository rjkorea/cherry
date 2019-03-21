import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.css']
})
export class TicketHomeComponent implements OnInit {
  contentId: string;
  start: number = 0;
  tickets: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
    this.getTicketList(0);
  }

  getTicketList(start): void {
    this.ticketService.getTypeListV2(this.contentId, start, 10).subscribe(res => {
      this.tickets = [...res['data']];
    });
  }

  createTickets(): void {
    this.router.navigate([`${this.router.url}/new`, {previous: this.tickets.length}]);
  }
}
