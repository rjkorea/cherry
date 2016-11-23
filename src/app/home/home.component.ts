import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin_name: string;
  invitations: Array<Object>;

  constructor(private invitationService: InvitationService) { }

  ngOnInit() {
    this.loadInvitations();
  }

  loadInvitations() {
    this.admin_name = localStorage.getItem('name');
    this.invitationService.getInvitations()
      .subscribe(
        response => {
          this.invitations = response['data'];
          console.log(this.invitations);
        },
        error => {
          console.log(error);
        }
      );
  }

  onChange(event) {
    console.log(event);
  }

}
