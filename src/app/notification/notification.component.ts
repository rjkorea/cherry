import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';
import { WebSocketService } from '../websocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  admin_name: string;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;
  edit_invitation_form: FormGroup;

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService,
              private fb:FormBuilder) {
                this.edit_invitation_form = this.fb.group({
                  'name': ['', Validators.required],
                  'mobile_number': ['', Validators.required],
                  'birthday': ['', ],
                  'email': ['', ],
                  'type': ['', Validators.required],
                  'gender': ['', ],
                  'entered': ['', ],
                  'group': ['', ],
                  'assignee': ['', ],
                  'fee': this.fb.group({
                    'enabled': [, ],
                    'price': [, ],
                    'method': ['', ]
                  })
                });
              }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 20)
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
          this.edit_invitation_form = this.fb.group({
            '_id': response['data']['_id'],
            'name': response['data']['name'],
            'mobile_number': response['data']['mobile_number'],
            'birthday': response['data']['birthday'],
            'email': response['data']['email'],
            'type': response['data']['type'],
            'gender': response['data']['gender'],
            'entered': response['data']['entered'],
            'group': response['data']['group'],
            'assignee': response['data']['assignee'],
            'fee': this.fb.group({
              'enabled': response['data']['fee']['enabled'],
              'price': response['data']['fee']['price'],
              'method': response['data']['fee']['method']
            })
          });

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
          this.loadNotifications();
        },
        error => {
          console.log(error);
        }
      );
  }
}
