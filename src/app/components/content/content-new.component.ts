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
  when_radio: string;
  when_value: any;
  when_range_value: any;


  constructor(private contentService: ContentService,
              private companyService: CompanyService,
              private adminService: AdminService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.when_radio = 'day';
    this.content = {
      company_oid: '',
      admin_oid: '',
      when: {},
      name: '',
      place: '',
      desc: ''
    };
    this.loadCompanies();
  }

  onSubmit() {
    if (this.when_radio === 'day') {
      if ('end' in this.content.when) {
        delete this.content.when.end;
      }
      this.content.when.start = this.when_value;
    }else if (this.when_radio === 'range') {
      this.content.when.start = this.when_range_value[0];
      this.content.when.end = this.when_range_value[1];
    };
    console.log(this.content);

    this.contentService.addContent(this.content)
      .subscribe(
        response => {
          this.router.navigate(['/content']);
        },
        error => {
          alert(error.message);
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
