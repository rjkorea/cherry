import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-register',
  templateUrl: './ticket-register.component.html',
  styleUrls: ['./ticket-register.component.css'],
  providers: []
})
export class TicketRegisterComponent implements OnInit {
  private user: any;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user= {
      name: '',
      mobile_number: '',
      birthday: '',
      gender: '',
      email: ''
    }
  }

  private onDone() {
    this.ticketService.registerTicket(this.route.snapshot.params['id'], this.user)
      .subscribe(
        response => {
          this.router.navigate(['/ticket', this.route.snapshot.params['id']]);
        },
        error => {
          console.log(error);
        }
      );
  }

  private disabledDone() {
    return !(this.user.name && this.user.mobile_number && this.user.gender && this.user.birthday && this.user.email);
  }

}
