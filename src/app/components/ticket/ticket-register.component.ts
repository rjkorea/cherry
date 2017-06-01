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
  private genders: any;
  private country_codes: any;
  private country_code: string;

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
    };
    this.genders = [
      {text: 'Male', value: 'male'},
      {text: 'Female', value: 'female'}
    ];
    this.country_codes = [
      {value: '+82', text: 'South Korea (+82)'},
      {value: '+61', text: 'Australia (+61)'},
      {value: '+55', text: 'Brazil (+55)'},
      {value: '+1', text: 'Canada (+1)'},
      {value: '+86', text: 'China (+86)'},
      {value: '+49', text: 'Germany (+49)'},
      {value: '+852', text: 'Hong Kong (+852)'},
      {value: '+81', text: 'Japan (+81)'},
      {value: '+65', text: 'Singapore (+65)'},
      {value: '+66', text: 'Thailand (+66)'},
      {value: '+44', text: 'United Kingdom (+44)'},
      {value: '+1', text: 'United States (+1)'}
    ];
  }

  private onDone() {
    this.user.mobile_number = this.country_code.slice(1) + this.user.mobile_number.slice(1);
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
    return !(this.user.name && this.user.mobile_number && this.user.gender && this.country_code);
  }

}
