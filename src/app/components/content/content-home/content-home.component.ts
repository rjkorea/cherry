import { Component, OnInit, HostListener } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {
  status: string;
  select_tags: Array<any>;
  tags: Array<string>;
  query: string;

  openContents = [];
  closedContents = [];
  openCount = 0;
  closedCount = 0;

  openStart = 0;
  closedStart = 0;

  search_term$ = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentservice: ContentService
  ) { }

  ngOnInit() {
    this.select_tags = [
      { name: '전체', enabled: true },
      { name: '페스티벌', enabled: false },
      { name: '클럽', enabled: false },
      { name: '전시', enabled: false },
      { name: '공연', enabled: false },
      { name: '콘서트', enabled: false },
      { name: '쿠폰', enabled: false },
      { name: '세미나', enabled: false },
      { name: '초대장', enabled: false },
      { name: '청첩장', enabled: false },
      { name: '기타', enabled: false }
    ];
    this.getInitData();
    this.contentservice.searchV2(this.search_term$, this.status, this.tags.join(), 0, 20).subscribe(
      response => {
        if (this.status === 'open') {
          this.openContents = response['data'];
          this.openCount = response['count'];
          this.closedContents = [];
          this.closedCount = 0;
        } else {
          this.closedContents = response['data'];
          this.closedCount = response['count'];
          this.openContents = [];
          this.openCount = 0;
        }
      }
    );
  }

  getInitData(): void {
    this.route.paramMap.subscribe(res => {
      this.status = res['params']['status'] || 'open';
      this.query = res['params']['query'] || '';
      this.openContents = [];
      this.closedContents = [];
      this.openCount = this.openStart = this.closedCount = this.closedStart = 0;
      this.applyTags();
      this.getContentList('open', this.query, this.tags.join(), 0);
      this.getContentList('closed', this.query, this.tags.join(), 0);
    });
  }

  onSearch(term: string) {
    this.query = term;
    this.applyTags();
    this.search_term$.next(term);
  }

  getContentList(status: string, query: string, tags: string, start: Number) {
    this.contentservice.getContentListV2(status, query, tags, start, 6).subscribe(res => {
      if (status === 'open') {
        this.openContents.push(...res['data']);
        this.openCount = res['count'];
      } else {
        this.closedContents.push(...res['data']);
        this.closedCount = res['count'];
      }
    });
  }

  applyTags() {
    this.tags = [];
    for (const i in this.select_tags) {
      if (this.select_tags[i]['enabled']) {
        this.tags.push(this.select_tags[i]['name']);
      }
    }
  }

  goTicket(content_oid: string) {
    this.router.navigate([`/ticket/type/${content_oid}`]);
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

  setStatus(status: string): void {
    this.status = status;
    this.router.navigate(['/contents', { status: this.status, query: this.query, tags: this.tags.join() }]);
  }

  onFilterTags(index: number) {
    // this.select_tags[index]['enabled'] = !this.select_tags[index]['enabled'];
    for (const i in this.select_tags) {
      if (Number(i) === index) {
        this.select_tags[i]['enabled'] = true;
      } else {
        this.select_tags[i]['enabled'] = false;
      }
    }
    this.applyTags();
    this.router.navigate(['/contents', { status: this.status, query: this.query, tags: this.tags.join() }]);
  }

  @HostListener('window:scroll', ['$scroll'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
      if (this.status === 'open') {
        if (this.openCount >= this.openStart) {
          this.openStart += 6;
          this.getContentList('open', this.query, this.tags.join(), this.openStart);
        }
      } else {
        if (this.closedCount >= this.closedStart) {
          this.closedStart += 6;
          this.getContentList('closed', this.query, this.tags.join(), this.closedStart);
        }
      }
    }
  }
}
