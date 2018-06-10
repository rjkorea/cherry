import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';
import { GroupService } from '../../services/group.service';
import { ContentService } from '../../services/content.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
  providers: []
})
export class EntranceComponent implements OnInit, OnDestroy {
  mode: string;
  user: string;
  users: Array<any>;
  users_count: number;
  tickets: Array<any>;
  tickets_count: number;
  content_oid: string;
  content_name: string;
  group_tickets: any;
  group_ticket_count: number;
  query: string;
  stats: any;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private contentService: ContentService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private websocketService: WebSocketService) { }

  ngOnInit() {
    this.query = '';
    this.mode = 'idle'; //idle, tablet, user search
    this.user = 'Noname';
    this.tickets = [];
    this.tickets_count = 0;
    this.group_tickets = [];
    this.group_ticket_count = 0;
    this.content_oid = '';
    this.content_name = '';
    this.stats = {
      group_ticket_count: 0,
      group_ticket_used_count: 0
    }
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    this.loadContent(this.content_oid);
    this.loadStats();
    this.initWebSocket();
  }

  ngOnDestroy() {
    this.websocketService.close();
  }

  loadContent(content_oid: string) {
    this.contentService.getContent(content_oid)
      .subscribe(
        response => {
          this.content_name = response['data']['name'];
        },
        error => {
          console.log(error);
        }
      );
  }

  loadStats() {
    this.groupService.getGroupList(this.content_oid, '', 0, 0)
      .subscribe(
        response => {
          this.stats['group_ticket_count'] = response['group_ticket_count'];
          this.stats['group_ticket_used_count'] = response['group_ticket_used_count'];
        },
        error => {
          console.log(error);
        }
      );
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        if (localStorage.getItem('tablet_code') === response['tablet_code'] && this.content_oid === response['content_oid']) {
          this.onTablet(response['content_oid'], response['auth_user_oid'], response['mobile_number']);
        } else {
          console.log('아이패드의 컨텐츠 설정을 확인해주세요');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onEnter(event) {
    console.log(event);
  }

  onCancel(event) {
    console.log(event);
  }

  onSearch() {
    this.userService.getUserList(this.query, 0, 100)
      .subscribe(
        response => {
          this.users_count = response['count'];
          this.users = response['data'];
        },
        error => {
          console.log(error);
        }
      );
    this.mode = 'search'
  }

  onTablet(content_oid: string, auth_user_oid: string, mobile_number: string) {
    this.user = '';
    this.tickets = null;
    this.tickets_count = 0;
    if (auth_user_oid) {
      this.userService.getUser(auth_user_oid)
        .subscribe(
          response => {
            this.user = response['data'];
            this.getNetworkTickets();
          },
          error => {
            console.log(error);
          }
        );
    }
    this.getGroupTickets(mobile_number);
    this.mode = 'tablet';
  }

  getNetworkTickets() {
    this.ticketService.getTicketEntranceListByUser(this.content_oid, this.user['_id'], 0, 100)
      .subscribe(
        response => {
          this.tickets = response['data'];
          this.tickets_count = response['count'];
        },
        error => {
          console.log(error);
        }
      );
  }

  getGroupTickets(mobile_number: string) {
    this.groupService.searchGroupTicket(this.content_oid, mobile_number)
      .subscribe(
        response => {
          this.group_tickets = response['data'];
          this.group_ticket_count = response['count'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onDoneEntrance(group_ticket: any) {
    const used_data = {
      'used': true
    };
    this.groupService.updateGroupTicket(group_ticket['content']['_id'], group_ticket['group']['_id'], group_ticket['_id'], used_data)
      .subscribe(
        response => {
          alert('입장처리를 완료했습니다.');
          this.loadStats();
          this.mode = 'idle';
        },
        error => {
          alert(error['message']);
          this.loadStats();
          this.mode = 'idle';
        }
      );
  }

}
