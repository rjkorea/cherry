import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  providers: []
})
export class TicketLogListComponent implements OnInit {

  count: number = 0;
  size: number = 20;
  page: number = 1;
  logs: any;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadOrders(this.page);
  }

  loadOrders(page: any) {
    this.ticketService.getLogList('', (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.logs = response['data'];
          console.log(this.count);
          console.log(this.logs);
          window.scrollTo(0, 0);
        },
        error => {
          console.log(error);
        }
      );
  }

}
