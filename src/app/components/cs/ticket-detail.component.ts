import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-cs-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: []
})
export class CsTicketDetailComponent implements OnInit {
  ticket: any;
  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) {
  }

  ngOnInit() {
    this.is_loading = false;
    const params: Params = this.route.snapshot.params;
    this.loadTicket(params['id']);
  }

  loadTicket(id: string) {
    this.ticketService.getTicket(id)
      .subscribe(
        response => {
          this.ticket = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

}
