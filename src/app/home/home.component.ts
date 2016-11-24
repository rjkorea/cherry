import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';

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

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService
  ) { }

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

  onChange(event) {
    console.log(event);
  }

}
