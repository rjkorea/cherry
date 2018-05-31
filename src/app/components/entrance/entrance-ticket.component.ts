import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { UserService } from '../../services/user.service';

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
  user_edit_mode: boolean;
  genders: any;
  user_form: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private ticketService: TicketService) { }

  ngOnInit() {
    this.user_edit_mode = false;
    this.methods = ['cash', 'creditcard'];
    this.genders = [
      {text: 'Male', value: 'male'},
      {text: 'Female', value: 'female'}
    ];
    this.user_form = {
      name: '',
      mobile_number: '',
      birthday: '',
      gender: '',
      email: ''
    };
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
    this.user_edit_mode = true;
  }

  onSaveUser() {
    this.user_form = {
      name: this.ticket.receive_user.name,
      email: this.ticket.receive_user.email,
      mobile_number: this.ticket.receive_user.mobile_number,
      birthday: this.ticket.receive_user.birthday,
      gender: this.ticket.receive_user.gender
    }
    this.userService.updateUser(this.ticket.receive_user._id, this.user_form)
      .subscribe(
        response => {
          this.loadTicket(this.ticket._id);
        },
        error => {
          console.log(error);
        }
      );
    this.user_edit_mode = false;
  }

  onCancelUser() {
    this.loadTicket(this.ticket._id);
    this.user_edit_mode = false;
  }

  onDoneEntrance() {
    this.ticket_form = {
      days: this.ticket.days,
      status: 'use'
    };
    this.ticketService.updateTicket(this.ticket._id, this.ticket_form)
      .subscribe(
        response => {
          this.router.navigate(['/entrance', {'content_oid': this.ticket['content']['_id']}]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
