import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { GroupService } from '../../services/group.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-content-group-edit',
  templateUrl: './content-group-edit.component.html',
  styleUrls: ['./content-group-edit.component.css'],
  providers: []
})
export class ContentGroupEditComponent implements OnInit {
  content: object;
  content_oid: string;
  group: object;
  group_oid: string;

  constructor(private contentService: ContentService,
              private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if ('content_oid') {
      this.content_oid = params['content_oid'];
    }
    if ('group_oid') {
      this.group_oid = params['group_oid'];
    }
    this.loadGroup(this.content_oid, this.group_oid);
  }

  loadGroup(content_oid: string, group_oid: string) {
    this.groupService.getGroup(content_oid, group_oid)
      .subscribe(
        response => {
          this.group = response['data'];
        },
        error => {
          alert(error.message);
        }
      );
  }

  onEdit() {
    this.group = {
      'name': this.group['name'],
      'desc': this.group['desc']
    };
    this.groupService.updateGroup(this.content_oid, this.group_oid, this.group)
      .subscribe(
        response => {
          this.group = response['data'];
          this.router.navigate(['/content', this.content_oid, 'groups']);
        },
        error => {
          alert(error.message);
        }
      );
  }

}
