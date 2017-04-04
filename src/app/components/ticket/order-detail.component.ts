import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [NotificationsService]
})
export class TicketOrderDetailComponent implements OnInit {
  order: any;
  order_form: any;
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
    this.loadOrder(params['id']);
    this.edit_mode = false;
  }

  loadOrder(id: string) {
    this.ticketService.getOrder(id)
      .subscribe(
        response => {
          this.order = response['data'];
          console.log(this.order);
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
    // this.order_form = {
    //   enabled: this.order.enabled
    // }
    // this.ticketService.updateOrder(this.type._id, this.type_form)
    //   .subscribe(
    //     response => {
    //       this.loadType(this.order._id);
    //       this.edit_mode = false;
    //     },
    //     error => {
    //       this.simpleNotificationsService.error(
    //         'Error',
    //         error['message'],
    //         this.notification_options
    //       );
    //       console.log(error);
    //     }
    //   );
  }

  onCancel() {
    this.loadOrder(this.order._id);
    this.edit_mode = false;
  }

}
