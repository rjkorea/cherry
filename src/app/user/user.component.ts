import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
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
  private page: any = 1;
  private size: any = 2;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('page' in params) {
      this.page = parseInt(params['page']);
    }
    this.loadAdmins(this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadAdmins(page: any) {
    this.userService.getAdmins((page-1)*this.size, this.size)
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
