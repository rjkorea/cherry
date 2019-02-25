import { Component, OnInit, HostListener } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {
  status: string;

  openContents = [];
  closedContents = [];
  openCount = 0;
  closedCount = 0;

  openStart = 0;
  closedStart = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentservice: ContentService
  ) { }

  ngOnInit() {
    this.getInitData();
  }

  getContentList(status, start) {
    this.contentservice.getContentListV2(status, start, 6).subscribe(res => {
      if (status === 'open') {
        this.openContents.push(...res['data']);
        this.openCount = res['count'] < 100 ? res['count'] : '99+';
      } else {
        this.closedContents.push(...res['data']);
        this.closedCount = res['count'] < 100 ? res['count'] : '99+';
      }
    });
  }

  getInitData(): void {
    this.route.paramMap.subscribe(res => {
      this.status = res['params']['status'] || 'open';

      this.openContents = [];
      this.closedContents = [];
      this.getContentList('open', 0);
      this.getContentList('closed', 0);
    });
  }

  setStatus(status): void {
    this.status = status;
    this.router.navigate(['/contents', { status: status }]);
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

  @HostListener('window:scroll', ['$scroll'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
      if (this.status === 'open') {
        if (this.openCount >= this.openStart) {
          this.openStart += 6;
          this.getContentList('open', this.openStart);
        }
      } else {
        if (this.closedCount >= this.closedStart)
        this.closedStart += 6;
        this.getContentList('closed', this.closedStart);
      }
    }
  }
}
