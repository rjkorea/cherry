import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: []
})
export class TicketOrderListComponent implements OnInit {
  orders: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 20;
  count: any = 0;
  ticket_type_oid: string;
  is_loading: boolean;
  selected_order: any;
  sms_message: string;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    this.sms_message = '';
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
    this.loadOrders(this.query, this.page);
  }

  loadOrders(query: any, page: any) {
    this.is_loading = true;
    this.ticketService.getOrderList(query, (page - 1) * this.size, this.size, this.ticket_type_oid)
      .subscribe(
        response => {
          this.count = response['count'];
          this.orders = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket/order', {query: this.query, page: this.page, ticket_type_oid: this.ticket_type_oid}]);
    this.loadOrders(this.query, 1);
  }

  onTicket(id: string) {
    this.router.navigate(['/ticket', {ticket_order_oid: id}]);
  }

  onSms(order: any) {
    this.selected_order = order;
    this.sms_message = this.selected_order.content.sms.message;
  }

  onSend(id: string) {
    let data = {
      sms_message: this.sms_message
    };
    this.ticketService.sendOrder(id, data)
      .subscribe(
        response => {
          if (response['is_sent_receiver']) {
            alert('SMS 전송이 완료되었습니다.');
          }else {
            alert('SMS 전송이 실패하였습니다.');
          }
          this.router.navigate(['/ticket/order', {query: this.query, page: this.page, ticket_type_oid: this.ticket_type_oid}]);
          this.loadOrders(this.query, this.page);
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  onNew() {
    this.router.navigate(['/ticket/orders/new', {ticket_type_oid: this.ticket_type_oid}]);
  }

}
