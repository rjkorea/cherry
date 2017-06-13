import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [NotificationsService]
})
export class UserDetailComponent implements OnInit {
  user: any;
  user_form: any;
  notification_options: Object;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadUser(params['id']);
    this.edit_mode = false;
  }

  loadUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        response => {
          this.user = response['data'];
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

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.user_form = {
      name: this.user.name,
      email: this.user.email,
      mobile_number: this.user.mobile_number,
      birthday: this.user.birthday,
      gender: this.user.gender,
      enabled: this.user.enabled
    }
    this.userService.updateUser(this.user._id, this.user_form)
      .subscribe(
        response => {
          this.loadUser(this.user._id);
          this.edit_mode = false;
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

  onCancel() {
    this.loadUser(this.user._id);
    this.edit_mode = false;
  }

}
