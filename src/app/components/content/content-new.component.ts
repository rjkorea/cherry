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
  when_range_value: any;
  when_datetime_range: Date[];
  tags: any;

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
      when: {},
      name: '',
      place: '',
      desc: '',
      notice: {
        enabled: false,
        message: ''
      },
      tags: []
    };
    this.tags = {
      festival: false,
      exhibition: false,
      show: false,
      club: false,
      party: false,
      meeting: false,
      etc: false
    };
    this.when_datetime_range = [new Date(), new Date()];
    this.loadCompanies();
  }

  onSubmit() {
    this.content.when.start = `${this.when_datetime_range[0].getUTCFullYear()}-${this.when_datetime_range[0].getUTCMonth() + 1}-${this.when_datetime_range[0].getUTCDate()}T${this.when_datetime_range[0].getUTCHours()}:${this.when_datetime_range[0].getUTCMinutes()}:${this.when_datetime_range[0].getUTCSeconds()}`;
    this.content.when.end = `${this.when_datetime_range[1].getUTCFullYear()}-${this.when_datetime_range[1].getUTCMonth() + 1}-${this.when_datetime_range[1].getUTCDate()}T${this.when_datetime_range[1].getUTCHours()}:${this.when_datetime_range[1].getUTCMinutes()}:${this.when_datetime_range[1].getUTCSeconds()}`;
    this.content.tags = [];
    for (const key in this.tags) {
      if (this.tags.hasOwnProperty(key)) {
        if (this.tags[key]) {
          this.content.tags.push(key);
        }
      }
    }
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
