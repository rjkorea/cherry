import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
  providers: []
})
export class StaffListComponent implements OnInit {
  admins: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;

  constructor(private adminService: AdminService,
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
    this.loadStaffs(this.query, this.page);
  }

  loadStaffs(query: any, page: any) {
    this.adminService.getAdminList(query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.admins = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page
    this.router.navigate(['/staff', {query: this.query, page: page}]);
    this.loadStaffs(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/staff', {query: this.query, page: page}]);
    this.loadStaffs(this.query, page);
  }

  search() {
    this.router.navigate(['/staff', {query: this.query, page: this.page}]);
    this.loadStaffs(this.query, 1);
  }

}
