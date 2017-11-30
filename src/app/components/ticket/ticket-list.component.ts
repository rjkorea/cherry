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
  tickets: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 20;
  count: any = 0;
  company_oid: string = '';
  companies: any;
  content_oid: string = '';
  contents: any;
  ticket_order_oid: string;
  selected_ticket: any;
  sms_message: string;
  is_loading: boolean;

  constructor(private ticketService: TicketService,
              private authService: AuthService,
              private companyService: CompanyService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
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
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('ticket_order_oid' in params) {
      this.ticket_order_oid = params['ticket_order_oid'];
    }
    this.loadTickets(this.query, this.page);
  }

  loadTickets(query: any, page: any) {
    this.is_loading = true;
    this.ticketService.getTicketList(query, this.company_oid, this.content_oid, (page - 1) * this.size, this.size, this.ticket_order_oid)
      .subscribe(
        response => {
          this.count = response['count'];
          this.tickets = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          this.is_loading = false;
          console.log(error);
        }
      );
  }

  onPrev() {
    this.page = this.page - 1;
    this.router.navigate(['/ticket', {query: this.query, page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.query, this.page);
  }

  onNext() {
    this.page = this.page + 1;
    this.router.navigate(['/ticket', {query: this.query, page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.query, this.page);
  }

  search() {
    this.router.navigate(['/ticket', {query: this.query, page: this.page, ticket_order_oid: this.ticket_order_oid}]);
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
    this.page = 1;
    this.router.navigate(['/ticket', {query: this.query, page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.query, this.page);
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
    this.page = 1;
    this.router.navigate(['/ticket', {query: this.query, page: this.page, ticket_order_oid: this.ticket_order_oid}]);
    this.loadTickets(this.query, this.page);
  }

  checkRole() {
    return this.authService.getRole() === 'super' ||
           this.authService.getRole() === 'admin' ||
           this.authService.getRole() === 'host';
  }

  onTicket(id: string) {
    this.router.navigate(['/ticket', id]);
  }

  onCancelModal(ticket: any) {
    this.selected_ticket = ticket;
  }

  onCancel(id: string) {
    this.ticketService.cancelTicket(id)
      .subscribe(
        response => {
          this.loadTickets(this.query, this.page);
          console.log(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  onSmsModal(ticket: any) {
    this.selected_ticket = ticket;
    this.sms_message = this.selected_ticket.content.sms.message;
  }

  onSend(id: string) {
    let data = {
      sms_message: this.sms_message
    };
    this.ticketService.sendSmsTicket(id, data)
      .subscribe(
        response => {
          if (response['is_sent_receiver']) {
            alert('SMS 전송이 완료되었습니다.');
          }else {
            alert('SMS 전송이 실패하였습니다.')
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
