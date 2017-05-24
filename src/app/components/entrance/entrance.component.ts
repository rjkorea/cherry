import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
  providers: []
})
export class EntranceComponent implements OnInit {
  private mode: string;
  private user: string;
  private users: Array<any>;
  private users_count: number;
  private tickets: Array<any>;
  private tickets_count: number;
  private query: string;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private websocketService: WebSocketService) { }

  ngOnInit() {
    this.query = '';
    this.mode = 'idle'; //idle, tablet, user search
    this.user = 'Noname';
    this.tickets = [];
    this.tickets_count = 0;
    this.initWebSocket();
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check tablet_code
        if(localStorage.getItem('tablet_code') == response['tablet_code']) {
          this.onTablet(response['auth_user_oid']);
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
    this.mode = 'search'
  }

  onTablet(auth_user_oid: string) {
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

    this.ticketService.getTicketListByUser(auth_user_oid, 0, 100)
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
