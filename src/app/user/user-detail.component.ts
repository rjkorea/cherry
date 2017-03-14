import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [NotificationsService]
})
export class UserDetailComponent implements OnInit {
  admin: any;
  notification_options: Object;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    console.log(params);

    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadAdmin(params['id']);
  }

  loadAdmin(id: string) {
    this.userService.readAdmin(id)
      .subscribe(
        response => {
          this.admin = response['data'];
          console.log(this.admin);
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
