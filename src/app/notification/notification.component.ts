import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';
import { WebSocketService } from '../websocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

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
              private websocketService: WebSocketService,
              private simpleNotificationsService: NotificationsService,
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
    this.initWebSocket();
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check admin _id
        if(localStorage.getItem('_id') == response['_id']) {
          console.log(response['_id']);
          this.simpleNotificationsService.info(
            response['type'],
            response['_id'],
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 128
            }
          );
          this.loadNotifications();
        }
      },
      error => {
        console.log(error);
      }
    );
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
