import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [NotificationsService]
})
export class CompanyListComponent implements OnInit {
  companies: Array<Object>;
  notification_options: Object;
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('query'in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.loadCompanies(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadCompanies(query:any, page: any) {
    this.companyService.getCompanyList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.companies = response['data'];
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

  onPrev() {
    let page = this.page - 1;
    this.page = page
    this.router.navigate(['/company', {query: this.query, page: page}]);
    this.loadCompanies(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/company', {query: this.query, page: page}]);
    this.loadCompanies(this.query, page);
  }

  search() {
    this.router.navigate(['/company', {query: this.query, page: this.page}]);
    this.loadCompanies(this.query, 1);
  }

}
