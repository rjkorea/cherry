import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: [NotificationsService]
})
export class TicketDetailComponent implements OnInit {
  ticket: any;
  ticket_form: any;
  notification_options: Object;

  constructor(private route: ActivatedRoute,
              private ticketService: TicketService,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadTicket(params['id']);
  }

  loadTicket(id: string) {
    this.ticketService.getTicket(id)
      .subscribe(
        response => {
          this.ticket = response['data'];
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

}
