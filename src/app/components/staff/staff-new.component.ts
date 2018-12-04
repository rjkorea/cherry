import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';

const ROLE_MAP: any = {
  super: [
    'admin', 'host', 'staff'
  ],
  admin: [
    'host', 'staff'
  ],
  host: [
    'staff'
  ]
};
const DEFAULT_PASSWORD = 'tkittkit';


@Component({
  selector: 'app-staff-new',
  templateUrl: './staff-new.component.html',
  styleUrls: ['./staff-new.component.css'],
  providers: []
})
export class StaffNewComponent implements OnInit {
  staff: any;
  error_msg = '';

  constructor(private adminService: AdminService,
              private companyService: CompanyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.staff = {
      name: '',
      email: '',
      mobile_number: '',
      password: DEFAULT_PASSWORD,
      password2: DEFAULT_PASSWORD,
      role: 'staff',
      company_oid: localStorage.getItem('company_oid')
    }
  }

  onSubmit() {
    this.adminService.addAdmin(this.staff)
      .subscribe(
        response => {
          this.router.navigate(['/staff']);
        },
        error => {
          this.error_msg = error['message']
          console.log(this.error_msg);
        }
      );
  }

  disabledSubmit() {
    return !(this.staff.name &&
            this.staff.email &&
            this.staff.mobile_number &&
            this.staff.password &&
            this.staff.password2);
  }

}
