import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css'],
  providers: []
})
export class AdminPasswordComponent implements OnInit {
  admin: any;
  error_msg = '';

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.admin = {
      old_password: '',
      new_password_1: '',
      new_password_2: '',
    }
  }

  changePassword() {
    this.adminService.updateAdminPassword(this.route.snapshot.params['id'], this.admin)
      .subscribe(
        response => {
          this.router.navigate(['/admin', this.route.snapshot.params['id']]);
        },
        error => {
          this.error_msg = error['message']
          console.log(this.error_msg);
        }
      );
  }

  disabledSubmit() {
    return !(this.admin.old_password &&
            this.admin.new_password_1 &&
            this.admin.new_password_2);
  }

}
