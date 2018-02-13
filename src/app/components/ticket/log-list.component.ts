import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  providers: []
})
export class TicketLogListComponent implements OnInit {

  count = 0;
  size = 20;
  page = 1;
  logs: any;
  content_oid: any;
  contents: any;
  is_loading: boolean;

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.loadContents();
    this.content_oid = '';
    const params: Params = this.route.snapshot.params;
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }

    this.loadLogs(this.page, this.content_oid);
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


  loadLogs(page: any, content_oid: string) {
    this.is_loading = true;
    this.ticketService.getLogList(content_oid, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.logs = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  checkRole() {
    return this.authService.getRole() === 'super' ||
      this.authService.getRole() === 'admin' ||
      this.authService.getRole() === 'host';
  }

  changeContent() {
    this.page = 1;
    this.router.navigate(['/tickets/log', { page: this.page, content: this.content_oid }]);
    this.loadLogs(this.page, this.content_oid);
  }

}
