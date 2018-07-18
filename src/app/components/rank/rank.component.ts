import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RankService } from '../../services/rank.service';
import { ContentService } from '../../services/content.service';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  contents: any;
  content_oid: string;
  ticket_orders_stats: any;
  sort: string;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rankService: RankService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = true;
    this.sort = 'register';
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];

    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
      this.loadRankContent(params['content_oid']);
    } else {
      this.is_loading = false;
    }
  }

  loadRankContent(id: string) {
    this.is_loading = true;
    this.rankService.getRankContent(id, 0, 20, this.sort)
      .subscribe(
        response => {
          this.ticket_orders_stats = response['data'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = this.contents.concat(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeContent() {
    if (this.content_oid) {
      this.router.navigate(['/rank', { content_oid: this.content_oid, sort: this.sort }]);
      this.loadRankContent(this.content_oid);
    } else {
      this.content_oid = '';
      this.router.navigate(['/rank']);
    }
  }

  onSort(sort: string) {
    this.sort = sort;
    this.router.navigate(['/rank', { content_oid: this.content_oid, sort: this.sort }]);
    this.loadRankContent(this.content_oid);
  }

}
