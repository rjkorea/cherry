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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService) { }

  ngOnInit() {
    this.methods = ['cash', 'creditcard'];
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

  onEditUser() {
    this.router.navigate(['/user', this.ticket.user._id]);
  }

  onDoneEntrance() {
    console.log(this.ticket);
    this.ticket_form = {
      days: this.ticket.days
    };
    this.ticketService.updateTicket(this.ticket._id ,this.ticket_form)
      .subscribe(
        response => {
          this.router.navigate(['/entrance']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
