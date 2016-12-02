import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  admin_name: string;
  admin_image: string;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;
  edit_invitation_form: FormGroup;

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService,
              private fb:FormBuilder) {
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
    this.admin_image = localStorage.getItem('image');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 20, localStorage.getItem('_id'))
      .subscribe(
        response => {
          this.notifications = response['data'];
          this.notification_count = response['count'];
          this.notification_unread = response['unread_count'];
          console.log(this.notifications);
        },
        error => {
          console.log(error);
        }
      );
  }

  readNotification(_id: string) {
    this.notificationService.readNotification(_id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadInvitation(_id: string, invitation_oid: string) {
    this.readNotification(_id);
    this.loadNotifications();
    this.invitationService.getInvitation(invitation_oid)
      .subscribe(
        response => {
          console.log(response);
          this.edit_invitation_form = this.fb.group(response['data']);
        },
        error => {
          console.log(error);
        }
      );
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
}
