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
  group_ticket: any;
  query: string;

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
    this.content_oid = '';
    this.content_name = '';
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    this.loadContent(this.content_oid);
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

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check tablet_code
        if (localStorage.getItem('tablet_code') === response['tablet_code'] && this.content_oid === response['content_oid']) {
          this.onTablet(response['content_oid'], response['auth_user_oid']);
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
    console.log('click search');
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
    // this.groupService.searchGroupTicket(this.content_oid, this.query)
    //   .subscribe(
    //     response => {
    //       this.group_ticket = response['data'];
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    this.mode = 'search'
  }

  onTablet(content_oid: string, auth_user_oid: string) {
    this.userService.getUser(auth_user_oid)
      .subscribe(
        response => {
          this.user = response['data'];
          console.log(this.user);
        },
        error => {
          console.log(error);
        }
      );

    this.ticketService.getTicketEntranceListByUser(content_oid, auth_user_oid, 0, 100)
      .subscribe(
        response => {
          this.tickets = response['data'];
          this.tickets_count = response['count'];
          console.log(this.tickets);
        },
        error => {
          console.log(error);
        }
      );

    this.mode = 'tablet';
  }

}
