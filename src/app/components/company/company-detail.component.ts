import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  providers: []
})
export class CompanyDetailComponent implements OnInit {
  company: any;
  company_form: any;
  notification_options: Object;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadCompany(params['id']);
    this.edit_mode = false;
  }

  loadCompany(id: string) {
    this.companyService.getCompany(id)
      .subscribe(
        response => {
          this.company = response['data'];
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
    this.company_form = {
      name: this.company.name,
      enabled: this.company.enabled,
      contact: {
        name: this.company.contact.name,
        mobile_number: this.company.contact.mobile_number,
        email: this.company.contact.email
      }
    }
    this.companyService.updateCompany(this.company._id, this.company_form)
      .subscribe(
        response => {
          this.loadCompany(this.company._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onCancel() {
    this.loadCompany(this.company._id);
    this.edit_mode = false;
  }

}
