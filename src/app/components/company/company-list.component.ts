import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: []
})
export class CompanyListComponent implements OnInit {
  companies: Array<any>;
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

  is_loading: boolean;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    this.loadCompanies(this.query, this.page);
  }

  loadCompanies(query: any, page: any) {
    this.is_loading = true;
    this.companyService.getCompanyList(query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.companies = response['data'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/company', {query: this.query, page: page}]);
    this.loadCompanies(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/company', {query: this.query, page: page}]);
    this.loadCompanies(this.query, page);
  }

  search() {
    this.router.navigate(['/company', {query: this.query, page: this.page}]);
    this.loadCompanies(this.query, 1);
  }

}
