import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css'],
  providers: []
})
export class CompanyNewComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.company = {
      name: '',
      contact: {
        'name': '',
        'mobile_number': '',
        'email': ''
      }
    };
  }

  onSubmit() {
    this.companyService.addCompany(this.company)
      .subscribe(
        response => {
          this.router.navigate(['/company']);
        },
        error => {
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.company.name && this.company.contact.name && this.company.contact.mobile_number && this.company.contact.email);
  }

}
