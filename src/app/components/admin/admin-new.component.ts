import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css'],
  providers: [NotificationsService]
})
export class AdminNewComponent implements OnInit {
  admin: any;
  notification_options: Object;

  constructor(private adminService: AdminService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.admin = {
      name: '',
      email: '',
      mobile_number: '',
      password: 'tkittkit',
      password2: 'tkittkit',
      role: ''
    }
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  onSubmit() {
    console.log(this.admin);
    this.adminService.addAdmin(this.admin)
      .subscribe(
        response => {
          this.router.navigate(['/admin']);
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

  disabledSubmit() {
    return !(this.admin.role && this.admin.name && this.admin.email && this.admin.mobile_number && this.admin.password);
  }

}
