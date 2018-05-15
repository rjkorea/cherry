import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GroupService } from '../../services/group.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-group-list',
  templateUrl: './content-group-list.component.html',
  styleUrls: ['./content-group-list.component.css'],
  providers: []
})
export class ContentGroupListComponent implements OnInit {
  groups: Array<Object>;
  group: Object;
  query: any = '';
  query_group_ticket: any;
  group_ticket: any;
  page: any = 1;
  size: any = 20;
  count: any = 0;
  group_ticket_count: any = 0;
  content_oid: string;
  content: Object;
  is_loading: boolean;

  constructor(private groupService: GroupService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    this.loadContent(this.content_oid);
    this.loadGroups(this.query, this.page);
  }

  loadContent(id: string) {
    this.is_loading = true;
    this.contentService.getContent(id)
      .subscribe(
        response => {
          this.content = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  loadGroups(query: any, page: any) {
    this.is_loading = true;
    this.groupService.getGroupList(this.content_oid, query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.groups = response['data'];
          this.group_ticket_count = response['group_ticket_count'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  onEdit(group: Object) {
    this.router.navigate(['/content', this.content_oid, 'group', group['_id'], 'edit']);
  }

  onRemove(group: Object) {
    if (confirm('티켓그룹을 삭제하시겠습니까?')) {
      this.groupService.removeGroup(this.content_oid, group['_id'])
        .subscribe(
          response => {
            alert('티켓그룹을 삭제를 완료하였습니다.');
            this.loadGroups(this.query, this.page);
          },
          error => {
            alert(error['message']);
          }
        );
      }
    }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/content', this.content_oid, 'groups', {query: this.query, page: page}]);
    this.loadGroups(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/content', this.content_oid, 'groups', {query: this.query, page: page}]);
    this.loadGroups(this.query, page);
  }

  search() {
    this.router.navigate(['/content', this.content_oid, 'groups', {query: this.query, page: this.page}]);
    this.loadGroups(this.query, 1);
  }

  searchUser() {
    // TODO: search group ticket by user name and mobile_number
    this.groupService.searchGroupTicket(this.content_oid, this.query_group_ticket)
      .subscribe(
        response => {
          this.group_ticket = response['data'];
          if (this.group_ticket) {
            console.log(this.group_ticket);
            this.router.navigate(['/content', this.content_oid, 'group', this.group_ticket['group_oid'], 'tickets', { query: this.query_group_ticket }]);
          } else {
            alert('등록되어 있지 않은 유저입니다.');
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
