import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NotificationsService]
})
export class UserComponent implements OnInit {
  users: Array<Object>;
  notification_options: Object;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('query'in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.loadUsers(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadUsers(query:any, page: any) {
    this.userService.getUserList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.users = response['data'];
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

  onPrev() {
    let page = this.page - 1;
    this.page = page
    this.router.navigate(['/user', {query: this.query, page: page}]);
    this.loadUsers(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/user', {query: this.query, page: page}]);
    this.loadUsers(this.query, page);
  }

  search() {
    this.router.navigate(['/user', {query: this.query, page: this.page}]);
    this.loadUsers(this.query, 1);
  }

}
