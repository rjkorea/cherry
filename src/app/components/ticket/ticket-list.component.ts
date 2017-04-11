import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  providers: [NotificationsService]
})
export class TicketListComponent implements OnInit {
  private tickets: Array<Object>;
  private notification_options: Object;
  private query: any = '';
  private page: any = 1;
  private size: any = 21;
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
    this.loadTickets(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadTickets(query:any, page: any) {
    this.ticketService.getTicketList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.tickets = response['data'];
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
    this.router.navigate(['/ticket', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket', {query: this.query, page: this.page}]);
    this.loadTickets(this.query, 1);
  }

}
