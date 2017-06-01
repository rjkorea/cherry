import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { CompanyService } from '../../services/company.service';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  providers: []
})
export class TicketListComponent implements OnInit {
  private tickets: Array<Object>;
  private query: any = '';
  private page: any = 1;
  private size: any = 21;
  private count: any = 0;
  private company_oid: string = '';
  private companies: any;
  private content_oid: string = '';
  private contents: any;

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private companyService: CompanyService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.companies = [
      {
        _id: '',
        name: '회사',
        contact: { name: '담당자 이름' }
      }
    ];
    this.loadCompanies();
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.loadContents();
    let params: Params = this.route.snapshot.params;
    if('query'in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    // this.loadTickets(this.query, this.page);
  }

  loadTickets(query:any, page: any) {
    this.ticketService.getTicketList(query, this.company_oid, this.content_oid, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.tickets = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    let page = this.page - 1;
    this.page = page
    this.router.navigate(['/ticket', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket', {query: this.query, page: this.page}]);
    this.loadTickets(this.query, 1);
  }

  loadCompanies() {
    this.companyService.getCompanyList('', 0, 100)
      .subscribe(
        response => {
          this.companies = this.companies.concat(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeCompany() {
    this.loadTickets(this.query, this.page);
    console.log('changed company', this.company_oid);
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = this.contents.concat(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeContent() {
    this.loadTickets(this.query, this.page);
    console.log('changed content', this.content_oid);
  }

}
