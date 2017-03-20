import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [NotificationsService]
})
export class AdminComponent implements OnInit {
  private admins: Array<Object>;
  private notification_options: Object;
  private query: any = '';
  private page: any = 1;
  private size: any = 3;
  private count: any = 0;

  constructor(private adminService: AdminService,
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
    this.loadAdmins(this.query, this.page);
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  loadAdmins(query:any, page: any) {
    this.adminService.getAdminList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.admins = response['data'];
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
    this.router.navigate(['/admin', {query: this.query, page: page}]);
    this.loadAdmins(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/admin', {query: this.query, page: page}]);
    this.loadAdmins(this.query, page);
  }

  search() {
    this.router.navigate(['/admin', {query: this.query, page: this.page}]);
    this.loadAdmins(this.query, 1);
  }

}
