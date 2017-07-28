import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers: []
})
export class AdminDetailComponent implements OnInit {
  admin: any;
  admin_form: any;
  edit_mode: boolean;
  company_oid: string;
  companies: any;
  error_msg = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.loadCompanies();
    let params: Params = this.route.snapshot.params;
    this.loadAdmin(params['id']);
    this.edit_mode = false;
  }

  loadAdmin(id: string) {
    this.adminService.getAdmin(id)
      .subscribe(
        response => {
          this.admin = response['data'];
          this.company_oid = this.admin.company._id;
        },
        error => {
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
      company_oid: this.company_oid,
      enabled: this.admin.enabled
    }
    this.adminService.updateAdmin(this.admin._id, this.admin_form)
      .subscribe(
        response => {
          this.loadAdmin(this.admin._id);
          localStorage.setItem('tablet_code', this.admin.tablet_code);
          this.edit_mode = false;
        },
        error => {
          this.error_msg = error['message'];
          console.log(this.error_msg);
        }
      );
  }

  changePassword() {
    this.router.navigate(['/admin', this.route.snapshot.params['id'], 'password']);
  }

  onCancel() {
    this.loadAdmin(this.admin._id);
    this.edit_mode = false;
  }

  loadCompanies() {
    this.companyService.getCompanyList('', 0, 100)
      .subscribe(
        response => {
          this.companies = response['data'];
        },
        error => {
          this.error_msg = error['message'];
          console.log(this.error_msg);
        }
      );

  }

}
