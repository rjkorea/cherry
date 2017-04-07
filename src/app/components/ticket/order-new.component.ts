import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css'],
  providers: [NotificationsService]
})
export class TicketOrderNewComponent implements OnInit {
  private order: any;
  private notification_options: Object;
  private types: Array<any> = [];
  private is_fee: boolean;
  private fee: any;
  private country_code: string;
  private mobile_number: string;

  constructor(private ticketService: TicketService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.is_fee = false;
    this.fee = {};
    this.country_code = '';
    this.mobile_number = '';
    this.order = {
      ticket_type_oid: '',
      qty: 0,
      expiry_date: '',
      receiver: {
        name: '',
        mobile_number: '',
        access_code: ''
      }
    }
    this.loadTypes();
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadTypes() {
    this.ticketService.getTypeList('', 0, 100)
    .subscribe(
      response => {
        for (let t of response['data']) {
          this.types.push({id: t['_id'], text: t['name']})
        }
        console.log(this.types);
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

  onSubmit() {
    if(this.is_fee) {
      this.order.fee = this.fee;
    }else {
      delete this.order.fee;
    }
    this.order.receiver.mobile_number = this.country_code + this.mobile_number.substr(1);
    console.log(this.order);
    this.ticketService.addOrder(this.order)
      .subscribe(
        response => {
          this.router.navigate(['/ticket/order']);
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

  public disabledSubmit() {
    return !(this.order.ticket_type_oid &&
      this.order.qty &&
      this.order.expiry_date &&
      this.order.receiver.name &&
      this.order.receiver.access_code &&
      this.country_code &&
      this.mobile_number
    );
  }

}
