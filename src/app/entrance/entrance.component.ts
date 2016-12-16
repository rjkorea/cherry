import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { WebSocketService } from '../websocket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})
export class EntranceComponent implements OnInit {
  admin_name: string;
  admin_image: string;
  is_entrance: boolean;
  entrance_user: Object;

  constructor(private invitationService: InvitationService,
              private websocketService: WebSocketService,
              private simpleNotificationsService: NotificationsService) {
              }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.admin_image = localStorage.getItem('image');
    this.is_entrance = false;
    this.entrance_user = {
      'group': '',
      'name': '',
      'mobile_number': '',
      'gender': '',
      'email': '',
      'fee': {}
    };
    this.initWebSocket();
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check admin _id
        if(localStorage.getItem('_id') == response['admin_oid']) {
          console.log(response['admin_oid']);
          this.entrance_user = response;
          this.is_entrance = true;
          /*
          this.simpleNotificationsService.info(
            response['name'],
            response['mobile_number'],
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 128
            }
          );
          */
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onEnter(event) {
    console.log(event);
    this.entrance_user['entered'] = true;
    delete this.entrance_user['admin_oid'];
    this.invitationService.updateInvitation(this.entrance_user)
      .subscribe(
        response => {
          console.log(response);
          this.simpleNotificationsService.success(
            'OK',
            this.entrance_user['name'] + ' complete entrance',
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 128
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    this.is_entrance = false;
  }

  onCancel(event) {
    console.log(event);
    this.simpleNotificationsService.error(
      'Cancel',
      'Entrance process',
      {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 128
      }
    );
    this.is_entrance = false;
  }

}
