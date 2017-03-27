import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.css'],
  providers: [NotificationsService]
})
export class TicketTypeDetailComponent implements OnInit {
  type: any;
  type_form: any;
  notification_options: Object;
  edit_mode: boolean;

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
    this.loadType(params['id']);
    this.edit_mode = false;
  }

  loadType(id: string) {
    this.ticketService.getType(id)
      .subscribe(
        response => {
          this.type = response['data'];
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

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.type_form = {
      name: this.type.name,
      desc: this.type.desc,
      price: this.type.price,
      enabled: this.type.enabled
    }
    this.ticketService.updateType(this.type._id, this.type_form)
      .subscribe(
        response => {
          this.loadType(this.type._id);
          this.edit_mode = false;
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

  onCancel() {
    this.loadType(this.type._id);
    this.edit_mode = false;
  }

}
