import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NotificationsService]
})
export class UserComponent implements OnInit {
  private admins: Array<Object>;
  private notification_options: Object;

  constructor(private userService: UserService,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadAdmins();
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadAdmins() {
    this.userService.getAdmins(0, 10)
      .subscribe(
        response => {
          this.admins = response['data'];
          console.log(this.admins);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

}
