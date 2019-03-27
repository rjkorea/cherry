import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-entrance-ticket',
  templateUrl: './entrance-ticket.component.html',
  styleUrls: ['./entrance-ticket.component.css'],
  providers: []
})
export class EntranceTicketComponent implements OnInit {
  ticket: any;
  ticket_form: any;
  methods: string[];
  user_form: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) { }

  ngOnInit() {
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

  onDoneEntrance() {
    this.ticketService.updateEnterTicket(this.ticket._id)
      .subscribe(
        response => {
          this.router.navigate(['/entrance', {'content_oid': this.ticket['content']['_id']}]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
