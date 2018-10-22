import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  contents: any;
  content_oid: string;

  total_ticket_count: any;
  total_ticket: any;
  total_company_count: number;
  total_user_count: number;
  total_content_count: number;
  top_contents;

  ticket_count: any;
  avg_age: any;
  revenue: any;
  top_ticket_types;

  gender_chart: any;
  age_chart: any;
  ticket_count_chart: any;

  content_cloud: any;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
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
    this.total_ticket_count = 0;
    this.ticket_count = {
      pend: 0,
      send: 0,
      register: 0,
      use: 0,
      cancel: 0
    };
    this.top_contents = [];
    this.top_ticket_types = [];
    this.ticket_count = {
      use: 0,
      total: 0
    };
    this.avg_age = {
      female: 0,
      gender: 0
    };
    this.revenue = {
      cash: 0,
      creditcard: 0
    };
    this.gender_chart = {
      type: 'doughnut',
      data: {
        labels: ['여자', '남자'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: [
              '#FF6384',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
    this.ticket_count_chart = {
      type: 'pie',
      data: {
        labels: ['전송준비', '전송중', '등록완료', '입장완료', '취소'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#777777',
              '#F0AD4E',
              '#5CB85C',
              '#5BC0DE',
              '#D9534F'
            ],
            hoverBackgroundColor: [
              '#777777',
              '#F0AD4E',
              '#5CB85C',
              '#5BC0DE',
              '#D9534F'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
    this.content_cloud = {
      data: [],
      options: {
        width: 1,
        overflow: true
      }
    };

    this.loadContents();
    this.loadDashboard();
  }

  loadDashboard() {
    this.is_loading = true;
    this.dashboardService.getDashboard()
      .subscribe(
        response => {
          this.total_ticket_count = response['data']['total_ticket_count'];
          this.ticket_count_chart['data']['datasets'][0]['data'] = [
            response['data']['ticket_count']['pend'],
            response['data']['ticket_count']['send'],
            response['data']['ticket_count']['register'],
            response['data']['ticket_count']['use'],
            response['data']['ticket_count']['cancel']
          ];
          this.total_company_count = response['data']['total_company_count'];
          this.total_user_count = response['data']['total_user_count'];
          this.total_content_count = response['data']['total_content_count'];
          this.top_contents = response['data']['top_contents'];
          this.content_cloud.data = [];
          for (const c of this.top_contents) {
            this.content_cloud.data.push({text: c.content.name, weight: c.ticket_cnt});
          }
          this.gender_chart['data']['datasets'][0]['data'] = [
            response['data']['gender_count']['male'],
            response['data']['gender_count']['female']
          ];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  loadDashboardContent(id: string) {
    this.is_loading = true;
    this.dashboardService.getDashboardContent(id)
      .subscribe(
        response => {
          this.ticket_count = response['data']['ticket_count'];
          this.ticket_count_chart['data']['datasets'][0]['data'] = [
            response['data']['ticket_count']['pend'],
            response['data']['ticket_count']['send'],
            response['data']['ticket_count']['register'],
            response['data']['ticket_count']['use'],
            response['data']['ticket_count']['cancel']
          ];
          this.avg_age = response['data']['avg_age'];
          this.revenue = response['data']['revenue'];
          this.top_ticket_types = response['data']['top_ticket_types'];
          this.gender_chart['data']['datasets'][0]['data'] = [
            response['data']['gender_count']['male'],
            response['data']['gender_count']['female']
          ];
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
      this.loadDashboardContent(this.content_oid);
    } else {
      this.loadDashboard();
    }
  }

}
