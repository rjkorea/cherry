import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GroupService } from '../../services/group.service';
import { ContentService } from '../../services/content.service';


@Component({
  selector: 'app-content-group-ticket-search',
  templateUrl: './content-group-ticket-search.component.html',
  styleUrls: ['./content-group-ticket-search.component.css'],
  providers: []
})
export class ContentGroupTicketSearchComponent implements OnInit {
  tickets: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 20;
  count: any = 0;
  content_oid: string;
  content: Object;
  ticket: Object;
  is_loading: boolean;
  selected_group_ticket: any;
  sms_message: string;

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
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    this.loadContent(this.content_oid);
    this.loadTickets(this.query);
  }

  loadTickets(query: any,) {
    this.is_loading = true;
    this.groupService.searchGroupTicket(this.content_oid, query)
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

  changeUsed(group_ticket: Object) {
    const data = {
      'used': !group_ticket['used']
    };
    this.groupService.updateGroupTicket(this.content_oid, group_ticket['group']['_id'], group_ticket['_id'], data)
      .subscribe(
        response => {
          if (data['used']) {
            alert('입장처리를 완료했습니다.');
          } else {
            alert('입장처리를 취소했습니다.');
          }
          this.loadTickets(this.query);
        },
        error => {
          alert(error['message']);
        }
      );
  }

  onSave(group_ticket: Object) {
    this.ticket = {
      'name': group_ticket['name'],
      'mobile_number': group_ticket['mobile_number']
    };
    this.groupService.updateGroupTicket(this.content_oid, group_ticket['group']['_id'], group_ticket['_id'], this.ticket)
      .subscribe(
        response => {
          alert('저장이 완료되었습니다.');
          this.loadTickets(this.query);
        },
        error => {
          alert(error['message']);
        }
      );
  }

  onReset(group_ticket: Object) {
    if (confirm('티켓 등록자를 지우시겠습니까?')) {
      this.groupService.resetGroupTicket(this.content_oid, group_ticket['group']['_id'], group_ticket['_id'])
        .subscribe(
          response => {
            this.loadTickets(this.query);
          },
          error => {
            alert(error['message']);
          }
        );
      }
    }

  onRemove(group_ticket: Object) {
    if (confirm('티켓을 삭제하시겠습니까?')) {
      this.groupService.removeGroupTicket(this.content_oid, group_ticket['group']['_id'], group_ticket['_id'])
        .subscribe(
          response => {
            this.loadTickets(this.query);
          },
          error => {
            alert(error['message']);
          }
        );
    }
  }

  search(query: string) {
    this.router.navigate(['/content', this.content_oid, 'group', 'search', {query: this.query}]);
    this.loadTickets(this.query);
  }

  onSmsModal(group_ticket: any) {
    this.selected_group_ticket = group_ticket;
    this.sms_message = '';
  }

  onSendSms() {
    const data = {
      sms_message: this.sms_message
    };
    this.groupService.sendSmsGroupTicket(this.selected_group_ticket['content_oid'], this.selected_group_ticket['group_oid'], this.selected_group_ticket['_id'], data)
      .subscribe(
        response => {
          alert('SMS 전송이 완료되었습니다.');
        },
        error => {
          console.log(error);
        }
      );
  }

}
