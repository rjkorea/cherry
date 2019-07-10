import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CsService } from '../../services/cs.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cs-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  providers: []
})
export class CsTicketsComponent implements OnInit {
  user: any;
  user_oid: string;
  tickets: Array<any>;
  count: number;
  page: number;
  size: number;
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
    this.count = 0;
    this.page = 1;
    this.size = 12;
    const params: Params = this.route.snapshot.params;
    this.user_oid = params['id'];
    this.getUser(this.user_oid);
  }

  getUser(user_oid: string) {
    this.is_loading = true;
    this.userService.getUser(user_oid)
      .subscribe(
        response => {
          this.user = response['data'];
          this.getTickets(this.user_oid, this.page);
        },
        error => {
          console.log(error);
          this.router.navigate(['/404']);
        }
      );
  }

  getTickets(user_oid: string, page: number) {
    this.is_loading = true;
    this.csService.getUserTickets(user_oid, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.tickets = response['data'];
          this.count = response['count'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/cs/user', this.user_oid, 'tickets', {page: page}]);
    this.getTickets(this.user_oid, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/cs/user', this.user_oid, 'tickets', {page: page}]);
    this.getTickets(this.user_oid, page);
  }


}
