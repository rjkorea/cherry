import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css'],
  providers: []
})
export class TicketLogDetailComponent implements OnInit {
  log: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketService: TicketService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadLog(params['id']);
  }

  loadLog(id: string) {
    this.ticketService.getLog(id)
      .subscribe(
        response => {
          this.log = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

}
