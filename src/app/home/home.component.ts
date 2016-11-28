import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin_name: string;
  invitations: Array<Object>;
  invitation_count: Number;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;
  invitation_form: FormGroup;
  edit_invitation_form: FormGroup;

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService,
              private fb: FormBuilder) {
    this.invitation_form = fb.group({
      'name': [null, Validators.required],
      'mobile_number': [null, Validators.required],
      'birthday': [null, Validators.required],
      'email': [null, ],
      'type': [null, Validators.required],
      'gender': [null, Validators.required]
    });
    this.edit_invitation_form = fb.group({
      'name': [null, Validators.required],
      'mobile_number': [null, Validators.required],
      'birthday': [null, Validators.required],
      'email': [null, ],
      'type': [null, Validators.required],
      'gender': [null, Validators.required],
      'entered': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.loadNotifications();
    this.loadInvitations();
  }

  loadInvitations() {
    this.invitationService.getInvitations()
      .subscribe(
        response => {
          this.invitations = response['data'];
          this.invitation_count = this.invitations.length;
          console.log(this.invitations);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 4)
      .subscribe(
        response => {
          this.notifications = response['data'];
          this.notification_count = this.notifications.length;
          this.notification_unread = this.notifications.length;
          console.log(this.notifications);
        },
        error => {
          console.log(error);
        }
      );
  }

  addInvitation(form: any) {
    console.log(form);
    this.invitationService.addInvitation(form)
      .subscribe(
        response => {
          console.log(response);
          this.invitation_form.reset();
        },
        error => {
          console.log(error);
        }
      );
  }

  openEditInvitation(data) {
    console.log(data);
    this.edit_invitation_form = this.fb.group(data);
  }

  editInvitation(form: any) {
    console.log(form);
    this.invitationService.updateInvitation(form)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  onChange(event, oid: string) {
    console.log(event);
    console.log(oid);
  }

}
