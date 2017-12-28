import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ReportService } from '../../services/report.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  contents: any;
  content_oid: string;

  total_forward: any;
  total_visit: any;
  total_revenue: any;

  total_ticket_count: any;
  total_ticket: any;
  total_company_count: number;
  total_user_count: number;
  total_content_count: number;
  total_gender_chart: any;
  top_contents;

  ticket_count: any;
  avg_age: any;
  revenue: any;
  pre_revenue: any;
  top_ticket_types;
  top_ticket_orders;

  register_gender_chart: any;
  use_gender_chart: any;
  age_chart: any;
  ticket_count_chart: any;

  content_cloud: any;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private reportService: ReportService,
              private dashboardService: DashboardService,
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
    this.total_revenue = {
      cash: 0,
      creditcard: 0
    };

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
    this.reportService.getReportContent(id)
      .subscribe(
        response => {
          this.total_forward = response['data']['total_forward'];
          this.total_visit = response['data']['total_visit'];
          this.total_revenue = response['data']['revenue'];
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
      this.router.navigate(['/report', this.content_oid]);
      this.loadReportContent(this.content_oid);
    } else {
      this.router.navigate(['/report']);
    }
  }

}
