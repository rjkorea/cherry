import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';
import { WebSocketService } from '../websocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin_name: string;
  admin_image: string;
  invitations: Array<Object>;
  invitation_count: Number;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;
  invitation_form: FormGroup;
  edit_invitation_form: FormGroup;
  filter_query: string = '';

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService,
              private websocketService: WebSocketService,
              private fb: FormBuilder) {
    this.invitation_form = this.fb.group({
      'name': ['', Validators.required],
      'mobile_number': ['', Validators.required],
      'birthday': ['', ],
      'email': ['', ],
      'type': ['', Validators.required],
      'gender': ['', ],
      'group': ['', ],
      'assignee': ['', ],
      'fee': this.fb.group({
        'enabled': [true, ],
        'price': [10000, ],
        'method': ['cash', ]
      })
    });
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
    this.admin_image = localStorage.getItem('image');
    this.loadNotifications();
    this.loadInvitations();
  }

  loadInvitations() {
    this.invitationService.getInvitations(0, 2000)
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
    this.notificationService.getNotifications(0, 4, localStorage.getItem('_id'))
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

  addInvitation(form: any) {
    console.log(form);
    this.invitationService.addInvitation(form)
      .subscribe(
        response => {
          console.log(response);
          this.loadInvitations();
          this.invitation_form.reset();
        },
        error => {
          console.log(error);
        }
      );
  }

  openEditInvitation(data) {
    console.log(data);
    this.edit_invitation_form = this.fb.group({
      '_id': data['_id'],
      'name': data['name'],
      'mobile_number': data['mobile_number'],
      'birthday': data['birthday'],
      'email': data['email'],
      'type': data['type'],
      'gender': data['gender'],
      'entered': data['entered'],
      'group': data['group'],
      'assignee': data['assignee'],
      'fee': this.fb.group({
        'enabled': data['fee']['enabled'],
        'price': data['fee']['price'],
        'method': data['fee']['method']
      })
    });

  }

  editInvitation(form: any) {
    console.log(form);
    this.invitationService.updateInvitation(form)
      .subscribe(
        response => {
          console.log(response);
          this.loadInvitations();
        },
        error => {
          console.log(error);
        }
      );
  }

}
