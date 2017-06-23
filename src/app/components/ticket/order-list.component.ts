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
  size: any = 9;
  count: any = 0;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.loadOrders(this.query, this.page);
  }

  loadOrders(query:any, page: any) {
    this.ticketService.getOrderList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.orders = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page}]);
    this.loadOrders(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page}]);
    this.loadOrders(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket/order', {query: this.query, page: this.page}]);
    this.loadOrders(this.query, 1);
  }

  onOrder(id: string) {
    this.router.navigate(['/ticket/order', id]);
  }

  onSend(id: string) {
    console.log('onSend');
  }

}
