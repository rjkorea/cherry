import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: []
})
export class TicketOrderDetailComponent implements OnInit {
  order: any;
  order_form: any;
  notification_options: Object;

  constructor(private route: ActivatedRoute,
              private ticketService: TicketService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadOrder(params['id']);
  }

  loadOrder(id: string) {
    this.ticketService.getOrder(id)
      .subscribe(
        response => {
          this.order = response['data'];
          console.log(this.order);
        },
        error => {
          console.log(error);
        }
      );
  }

  onDisable() {
    this.order_form = {
      enabled: false
    }
    this.ticketService.updateOrder(this.order._id, this.order_form)
      .subscribe(
        response => {
          this.loadOrder(this.order._id);
        },
        error => {
          console.log(error);
        }
      );
  }

  onSend() {
    this.ticketService.sendOrder(this.order._id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  isDisable() {
    return !this.order.enabled;
  }

}
