import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TIMService } from '../../services/tim.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-tim-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  contents: any;
  content_oid: string;

  total_forward: any;
  total_visit: any;
  total_revenue: any;
  commission: number;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private timService: TIMService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = true;
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.total_forward = 0;
    this.total_visit = 0;
    this.total_revenue = 0;
    this.commission = 1.0;

    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('id' in params) {
      this.content_oid = params['id'];
      this.loadReportContent(params['id']);
    } else {
      this.is_loading = false;
    }
  }

  loadReportContent(id: string) {
    this.is_loading = true;
    this.timService.getReportContent(id)
      .subscribe(
        response => {
          this.total_forward = response['data']['total_forward'];
          this.total_visit = response['data']['total_visit'];
          this.total_revenue = response['data']['revenue'];
          this.commission = response['data']['commission'];
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
      this.router.navigate(['/tim/report', this.content_oid]);
      this.loadReportContent(this.content_oid);
    } else {
      this.router.navigate(['/tim/report']);
    }
  }

}
