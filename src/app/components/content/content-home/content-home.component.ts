import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {
  openContents: Array<Object>;
  closedContents: Array<Object>;
  openCount = 0;
  closedCount = 0;
  status = 'open';

  constructor(
    private router: Router,
    private contentservice: ContentService
  ) { }

  ngOnInit() {
    this.getContentList('open', 0, 6);
    this.getContentList('closed', 0, 6);
  }

  getContentList(status, start, size): void {
    this.contentservice.getContentListV2(status, start, size).subscribe(res => {
      if (status === 'open') {
        this.openContents = res['data'];
        this.openCount = res['count'];
      } else {
        this.closedContents = res['data'];
        this.closedCount = res['count'];
      }
    });
  }

  setStatus(status): void {
    this.status = status;
  }

  goTicket(content_oid: string) {
    this.router.navigate(['/ticket', 'type', {content_oid: content_oid}]);
  }

  goEntrance(content_oid: string) {
    this.router.navigate(['/entrance', {content_oid: content_oid}]);
  }

  goStats(content_oid: string) {
    this.router.navigate(['/stats', content_oid ]);
  }

  goStaff() {
    this.router.navigate(['/staff']);
  }

  goDetail(content_oid: string) {
    this.router.navigate([`/content/${content_oid}`]);
  } 
}
