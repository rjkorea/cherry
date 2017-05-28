import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: []
})
export class TicketDetailComponent implements OnInit {
  ticket: any;
  ticket_form: any;
  notification_options: Object;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ticketService: TicketService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
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

  registerUser() {
    this.router.navigate(['ticket', this.ticket._id, 'register']);
  }

}
