import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css'],
  providers: [NotificationsService]
})
export class CompanyNewComponent implements OnInit {
  company: any;
  notification_options: Object;

  constructor(private companyService: CompanyService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.company = {
      name: '',
      contact: {
        'name': '',
        'mobile_number': '',
        'email': ''
      }
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
    this.companyService.addCompany(this.company)
      .subscribe(
        response => {
          this.router.navigate(['/company']);
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
    return !(this.company.name && this.company.contact.name && this.company.contact.mobile_number && this.company.contact.email);
  }

}
