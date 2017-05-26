import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { CompanyService } from '../../services/company.service';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-content-new',
  templateUrl: './content-new.component.html',
  styleUrls: ['./content-new.component.css'],
  providers: []
})
export class ContentNewComponent implements OnInit {
  content: any;
  companies: any;
  admins: any;
  role: string;

  constructor(private contentService: ContentService,
              private companyService: CompanyService,
              private adminService: AdminService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.content = {
      company_oid: '',
      admin_oid: '',
      name: '',
      place: '',
      desc: ''
    }
    this.loadCompanies();
  }

  onSubmit() {
    this.contentService.addContent(this.content)
      .subscribe(
        response => {
          this.router.navigate(['/content']);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadCompanies() {
    this.companyService.getCompanyList('', 0, 100)
      .subscribe(
        response => {
          this.companies = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  loadAdmins(company_oid: string) {
    this.adminService.getAdminList(company_oid, 0, 100)
      .subscribe(
        response => {
          this.admins = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  changeRole() {
    console.log(this.content.company_oid);
  }

  disabledSubmit() {
    return !(this.content.name && this.content.place);
  }

}
