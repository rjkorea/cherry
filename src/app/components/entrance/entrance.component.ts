import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  query: string;
  staff_notice: string;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private contentService: ContentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.query = '';
    this.mode = 'idle'; //idle, search, user
    this.user = '';
    this.tickets = [];
    this.tickets_count = 0;
    this.content_oid = '';
    this.content_name = '';
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    this.loadContent(this.content_oid);
  }

  ngOnDestroy() {
    // this.websocketService.close();
  }

  loadContent(content_oid: string) {
    this.contentService.getContent(content_oid)
      .subscribe(
        response => {
          this.content_name = response['data']['name'];
          if ('staff_notice' in response['data']) {
            this.staff_notice = response['data']['staff_notice'];
          }
        },
        error => {
          console.log(error);
        }
      );
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

  getTickets(content_oid: string, user_oid: string) {
    this.user = '';
    this.tickets = null;
    this.tickets_count = 0;
    if (user_oid) {
      this.userService.getUser(user_oid)
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
    this.mode = 'ticket';
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

}
