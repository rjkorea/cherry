import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

enum State {
  Init, Loading, Done
}

@Component({
  selector: 'app-ticket-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: []
})
export class TicketOrderListComponent implements OnInit {
  StateEnum = State;
  state: State;
  orders: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;
  ticket_type_oid: string;
  type: any;
  ticket_order_type: string;

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.state = this.StateEnum.Init;
    this.ticket_order_type = '';
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('ticket_type_oid' in params) {
      this.ticket_type_oid = params['ticket_type_oid'];
    }
    this.loadType(this.ticket_type_oid);
    this.loadOrders(this.ticket_type_oid, this.query, this.page);
  }

  loadType(id: string) {
    this.ticketService.getType(id)
      .subscribe(
        response => {
          this.type = response['data'];
          window.scrollTo(0, 0);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadOrders(ticket_type_oid: string, query: any, page: any) {
    this.state = this.StateEnum.Loading;
    this.ticketService.getOrderList(query, (page - 1) * this.size, this.size, ticket_type_oid)
      .subscribe(
        response => {
          this.count = response['count'];
          this.orders = response['data'];
          window.scrollTo(0, 0);
          this.state = this.StateEnum.Done;
        },
        error => {
          console.log(error);
          this.state = this.StateEnum.Done;
        }
      );
  }

  onFirstPage() {
    this.page = 1;
    this.router.navigate(['/ticket/order', {query: this.query, page: this.page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.ticket_type_oid, this.query, this.page);
  }

  onPrevPage() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.ticket_type_oid, this.query, page);
  }

  onNextPage() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.ticket_type_oid, this.query, page);
  }

  onEndPage() {
    this.page = Math.floor(this.count / this.size) + 1;
    this.router.navigate(['/ticket/order', {query: this.query, page: this.page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.ticket_type_oid, this.query, this.page);
  }


  onTicket(id: string) {
    this.router.navigate(['/ticket', {ticket_order_oid: id}]);
  }

  onSearch(query: string) {
    this.router.navigate(['/ticket/order', {query: query, page: 1, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.ticket_type_oid, query, 1);
  }

  onNew() {
    this.router.navigate(['/ticket/orders/new', {ticket_type_oid: this.ticket_type_oid}]);
  }

}
