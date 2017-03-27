import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css'],
  providers: [NotificationsService]
})
export class TicketTypeNewComponent implements OnInit {
  type: any;
  notification_options: Object;

  constructor(private ticketService: TicketService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.type = {
      name: '',
      desc: '',
      price: 0
    }
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  onSubmit() {
    this.ticketService.addType(this.type)
      .subscribe(
        response => {
          this.router.navigate(['/ticket/type']);
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

  disabledSubmit() {
    return !(this.type.name && this.type.desc && this.type.price);
  }

}
