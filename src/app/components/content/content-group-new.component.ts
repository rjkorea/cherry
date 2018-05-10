import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-content-group-new',
  templateUrl: './content-group-new.component.html',
  styleUrls: ['./content-group-new.component.css'],
  providers: []
})
export class ContentGroupNewComponent implements OnInit {
  content: any;
  group: any;

  constructor(private contentService: ContentService,
              private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.group = {
      content_oid: params['content_oid'],
      name: '',
      desc: '',
      qty: 0
    };
    this.loadContent(params['content_oid']);
  }

  onSubmit() {
    this.groupService.addGroup(this.content['_id'], this.group)
      .subscribe(
        response => {
          this.router.navigate(['/content', this.content['_id'], 'groups']);
        },
        error => {
          alert(error.message);
          console.log(error);
        }
      );
  }

  loadContent(content_oid: string) {
    this.contentService.getContent(content_oid)
      .subscribe(
        response => {
          this.content = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.group['name'] && this.group['desc'] && this.group['qty']);
  }

}
