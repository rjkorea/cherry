import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GroupService } from '../../services/group.service';
import { ContentService } from '../../services/content.service';


@Component({
  selector: 'app-content-group-ticket-list',
  templateUrl: './content-group-ticket-list.component.html',
  styleUrls: ['./content-group-ticket-list.component.css'],
  providers: []
})
export class ContentGroupTicketListComponent implements OnInit {
  tickets: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 20;
  count: any = 0;
  content_oid: string;
  content: Object;
  group_oid: string;
  group: Object;
  ticket: Object;
  is_loading: boolean;

  constructor(private groupService: GroupService,
              private contentService: ContentService,
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
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    if ('group_oid' in params) {
      this.group_oid = params['group_oid'];
    }
    this.loadContent(this.content_oid);
    this.loadGroup(this.content_oid, this.group_oid);
    this.loadTickets(this.query, this.page);
  }

  loadTickets(query: any, page: any) {
    this.is_loading = true;
    this.groupService.getGroupTicketList(this.content_oid, this.group_oid, query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.tickets = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  loadGroup(content_oid: string, group_oid: string) {
    this.is_loading = true;
    this.groupService.getGroup(content_oid, group_oid)
      .subscribe(
        response => {
          this.group = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  loadContent(id: string) {
    this.is_loading = true;
    this.contentService.getContent(id)
      .subscribe(
        response => {
          this.content = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  onAdd() {
    this.groupService.addGroupTicket(this.content_oid, this.group_oid)
      .subscribe(
        response => {
          this.loadTickets(this.query, this.page);
          alert('그룹티켓이 추가되었습니다.');
        },
        error => {
          alert(error['message']);
        }
      );
  }

  onSave(group_ticket: Object) {
    this.ticket = {
      'name': group_ticket['name'],
      'mobile_number': group_ticket['mobile_number'],
      'used': group_ticket['used']
    };
    this.groupService.updateGroupTicket(this.content_oid, this.group_oid, group_ticket['_id'], this.ticket)
      .subscribe(
        response => {
          alert('저장이 완료되었습니다.');
          this.loadTickets(this.query, this.page);
        },
        error => {
          alert(error['message']);
        }
      );
  }

  onReset(group_ticket: Object) {
    if (confirm('티켓 등록자를 지우시겠습니까?')) {
      this.groupService.resetGroupTicket(this.content_oid, this.group_oid, group_ticket['_id'])
        .subscribe(
          response => {
            this.loadTickets(this.query, this.page);
          },
          error => {
            alert(error['message']);
          }
        );
      }
    }

  onRemove(group_ticket: Object) {
    if (confirm('티켓을 삭제하시겠습니까?')) {
      this.groupService.removeGroupTicket(this.content_oid, this.group_oid, group_ticket['_id'])
        .subscribe(
          response => {
            this.loadTickets(this.query, this.page);
          },
          error => {
            alert(error['message']);
          }
        );
    }
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/content', this.content_oid, 'group', this.group_oid, 'tickets', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/content', this.content_oid, 'group', this.group_oid, 'tickets', {query: this.query, page: page}]);
    this.loadTickets(this.query, page);
  }

  search() {
    this.router.navigate(['/content', this.content_oid, 'group', this.group_oid, 'tickets', {query: this.query, page: this.page}]);
    this.loadTickets(this.query, 1);
  }

}
