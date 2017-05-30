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
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css'],
  providers: []
})
export class AdminNewComponent implements OnInit {
  admin: any;
  roles: string[];
  companies: any;
  error_msg = '';

  constructor(private adminService: AdminService,
              private companyService: CompanyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.roles = ROLE_MAP[this.authService.getRole()];
    this.admin = {
      name: '',
      email: '',
      mobile_number: '',
      password: DEFAULT_PASSWORD,
      password2: DEFAULT_PASSWORD,
      role: this.roles[0],
      company_oid: ''
    }
    this.loadCompanies()
  }

  onSubmit() {
    this.adminService.addAdmin(this.admin)
      .subscribe(
        response => {
          this.router.navigate(['/admin']);
        },
        error => {
          this.error_msg = error['message']
          console.log(this.error_msg);
        }
      );
  }

  changeRole() {
    if(this.admin.role == 'admin') {
      this.admin.company_oid = '';
    }
  }

  loadCompanies() {
    this.companyService.getCompanyList('', 0, 100)
      .subscribe(
        response => {
          this.companies = response['data'];
        },
        error => {
          this.error_msg = error['message']
          console.log(this.error_msg);
        }
      );
  }

  disabledSubmit() {
    return !(this.admin.role &&
            this.admin.name &&
            this.admin.email &&
            this.admin.mobile_number &&
            this.admin.password);
  }

}
