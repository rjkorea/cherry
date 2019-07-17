import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: []
})
export class TicketOrderDetailComponent implements OnInit {
  order: any;
  order_form: any;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private ticketService: TicketService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadOrder(params['id']);
  }

  loadOrder(id: string) {
    this.ticketService.getOrder(id)
      .subscribe(
        response => {
          this.order = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }
}
