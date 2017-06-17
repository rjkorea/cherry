import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
  providers: [NotificationsService]
})
export class TicketTypeListComponent implements OnInit {
  types: Array<Object>;
  notification_options: Object;
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

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
    this.loadTypes(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadTypes(query:any, page: any) {
    this.ticketService.getTypeList('', '', query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.types = response['data'];
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
    this.router.navigate(['/ticket/type', {query: this.query, page: page}]);
    this.loadTypes(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/type', {query: this.query, page: page}]);
    this.loadTypes(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket/type', {query: this.query, page: this.page}]);
    this.loadTypes(this.query, 1);
  }

}
