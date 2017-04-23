import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers: [NotificationsService]
})
export class AdminDetailComponent implements OnInit {
  admin: any;
  admin_form: any;
  notification_options: Object;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
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
    this.adminService.getAdmin(id)
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
      tablet_code: this.admin.tablet_code,
      company: this.admin.company,
      website: this.admin.website,
      enabled: this.admin.enabled
    }
    this.adminService.updateAdmin(this.admin._id, this.admin_form)
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
