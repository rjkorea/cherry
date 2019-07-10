import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-ticket-home',
  templateUrl: './ticket-home.component.html',
  styleUrls: ['./ticket-home.component.css']
})
export class TicketHomeComponent implements OnInit {
  contentId: string;
  contentName: string;
  start: number = 0;
  maxTickets: number = 200;
  tickets: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private contentService: ContentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
    this.getContentInfo();
    this.getTicketList(this.start, this.maxTickets);
  }

  getTicketList(start, size): void {
    this.ticketService.getTypeListV2(this.contentId, start, size).subscribe(res => {
      this.tickets = [...res['data']];
    });
  }

  getContentInfo(): void {
    this.contentService.getContent(this.contentId).subscribe(res => {
      this.contentName = res['data']['name'];
    });
  }

  createTickets(id: string): void {
    this.router.navigate([`ticket/types/${id}/new`, {previous: this.tickets.length}]);
  }


  duplicateTicket(id: string): void {
    this.ticketService.duplicateTicketType(id)
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          alert(error.message);
          console.log(error);
        }
      );
    // this.router.navigate([`ticket/types/${id}/duplicate`, { previous: this.tickets.length }]);
  }

  editTicket(id: string): void {
    this.router.navigate([`ticket/type/${id}/edit`]);
  }

  getOrders(id: string): void {
    this.router.navigate([`ticket/order`, {ticket_type_oid: id}]);
  }

  createOrder(id: string): void {
    this.router.navigate([`ticket/orders/new`, {ticket_type_oid: id}]);
  }

  checkRole() {
    return this.authService.getRole();
  }

}
