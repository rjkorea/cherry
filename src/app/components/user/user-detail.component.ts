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
  admin: any;
  admin_form: any;
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
    this.loadAdmin(params['id']);
    this.edit_mode = false;
  }

  loadAdmin(id: string) {
    this.userService.getAdmin(id)
      .subscribe(
        response => {
          this.admin = response['data'];
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
    this.admin_form = {
      name: this.admin.name,
      email: this.admin.email,
      mobile_number: this.admin.mobile_number,
      company: this.admin.company,
      website: this.admin.website,
      enabled: this.admin.enabled
    }
    this.userService.updateAdmin(this.admin._id, this.admin_form)
      .subscribe(
        response => {
          this.loadAdmin(this.admin._id);
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
    this.loadAdmin(this.admin._id);
    this.edit_mode = false;
  }

}
