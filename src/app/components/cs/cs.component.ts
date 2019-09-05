import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css'],
  providers: []
})
export class CsComponent implements OnInit, OnDestroy {
  mode: string;
  users: Array<any>;
  users_count: number;
  query: string;
  is_loading: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.is_loading = false;
    this.users_count = 0;
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
      this.onSearch();
    }
  }

  ngOnDestroy() {}

  onSearch() {
    this.is_loading = true;
    this.mode = 'idle';
    this.userService.getUserList(this.query, 0, 100)
      .subscribe(
        response => {
          this.users_count = response['count'];
          this.users = response['data'];
          this.is_loading = false;
          this.mode = 'search'
          this.router.navigate(['/cs', { query: this.query }]);
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  goUserTickets(user_oid: string) {
    this.router.navigate(['/cs/user', user_oid, 'tickets']);
  }

}
