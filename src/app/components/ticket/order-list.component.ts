import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [NotificationsService]
})
export class TicketOrderListComponent implements OnInit {
  private orders: Array<Object>;
  private notification_options: Object;
  private query: any = '';
  private page: any = 1;
  private size: any = 9;
  private count: any = 0;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('query'in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.loadOrders(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadOrders(query:any, page: any) {
    this.ticketService.getOrderList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.orders = response['data'];
          console.log(this.orders);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

  onPrev() {
    let page = this.page - 1;
    this.page = page
    this.router.navigate(['/ticket/order', {query: this.query, page: page}]);
    this.loadOrders(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/order', {query: this.query, page: page}]);
    this.loadOrders(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket/order', {query: this.query, page: this.page}]);
    this.loadOrders(this.query, 1);
  }

}
