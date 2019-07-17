import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

enum State {
  Init, Loading, Done
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  providers: []
})
export class TicketListComponent implements OnInit {
  StateEnum = State;
  state: State;
  tickets: any;
  page: any = 1;
  size: any = 20;
  count: any = 0;
  ticket_order_oid: string;
  selected_ticket: any;
  sms_message: string;
  filters: any;

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.state = this.StateEnum.Init;
    this.filters = {
      send: true,
      register: true,
      pay: true,
      use: true,
      cancel: true
    }
    const params: Params = this.route.snapshot.params;
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('ticket_order_oid' in params) {
      this.ticket_order_oid = params['ticket_order_oid'];
    }
    this.loadTickets(this.page);
  }

  loadTickets(page: any) {
    this.state = this.StateEnum.Loading;
    const sort = [];
    for (const k in this.filters) {
      if (this.filters[k]) {
        sort.push(k);
      }
    }
    this.ticketService.getTicketList((page - 1) * this.size, this.size, this.ticket_order_oid, sort.join())
      .subscribe(
        response => {
          this.count = response['count'];
          this.tickets = response['data'];
          window.scrollTo(0, 0);
          this.state = this.StateEnum.Done;
        },
        error => {
          this.state = this.StateEnum.Done;
          console.log(error);
        }
      );
  }

  onPrev() {
    this.page = this.page - 1;
    this.router.navigate(['/ticket', {page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.page);
  }

  onNext() {
    this.page = this.page + 1;
    this.router.navigate(['/ticket', {page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.page);
  }

  onTicket(id: string) {
    this.router.navigate(['/ticket', id]);
  }

  onCancelModal(ticket: any) {
    this.selected_ticket = ticket;
  }

  onCancel(id: string) {
    this.ticketService.cancelTicket(id)
      .subscribe(
        response => {
          this.loadTickets(this.page);
        },
        error => {
          console.log(error);
        }
      );
  }

  onFilter(status: string) {
    this.filters[status] = !this.filters[status];
    this.loadTickets(1);
  }

}
