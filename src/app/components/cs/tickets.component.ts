import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CsService } from '../../services/cs.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cs-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: []
})
export class CsTicketsComponent implements OnInit, OnDestroy {
  user: any;
  tickets: Array<any>;
  tickets_count: number;
  query: string;
  is_loading: boolean;

  constructor(
    private userService: UserService,
    private csService: CsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.is_loading = false;
    this.tickets = [];
    this.tickets_count = 0;
    const params: Params = this.route.snapshot.params;
    this.getUser(params['id'])
  }

  ngOnDestroy() {}

  getUser(user_oid: string) {
    this.is_loading = true;
    this.userService.getUser(user_oid)
      .subscribe(
        response => {
          this.user = response['data'];
          this.getTickets(user_oid);
        },
        error => {
          console.log(error);
        }
      );
  }

  getTickets(user_oid: string) {
    this.csService.getUserTickets(0, 200, user_oid)
      .subscribe(
        response => {
          this.tickets = response['data'];
          this.tickets_count = response['count'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

}
