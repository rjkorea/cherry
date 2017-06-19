import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: []
})
export class UserComponent implements OnInit {
  users: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    this.loadUsers(this.query, this.page);
  }

  loadUsers(query:any, page: any) {
    this.userService.getUserList(query, (page - 1 ) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.users = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/user', {query: this.query, page: page}]);
    this.loadUsers(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/user', {query: this.query, page: page}]);
    this.loadUsers(this.query, page);
  }

  search() {
    this.router.navigate(['/user', {query: this.query, page: this.page}]);
    this.loadUsers(this.query, 1);
  }

}
