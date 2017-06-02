import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private contents: any;
  private content_oid: string;

  private total_ticket_count: number;
  private total_company_count: number;
  private total_user_count: number;
  private total_content_count: number;
  private recent_contents;

  private ticket_count: any;
  private avg_age: any;
  private revenue: any;
  private recent_ticket_types;

  type = 'pie';
  data = {
    labels: ["여자", "남자"],
    datasets: [
      {
        data: [280, 85],
        backgroundColor: [
            "#FF6384",
            "#36A2EB"
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"
        ]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  type2 = 'doughnut';
  data2 = {
    labels: ["20대", "30대", "40대"],
    datasets: [
      {
        data: [250, 98, 6],
        backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ]
      }
    ]
  };
  options2 = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private route: ActivatedRoute,
              private dashboardService: DashboardService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.recent_contents = [];
    this.recent_ticket_types = [];
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
    this.loadContents();
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getDashboard()
      .subscribe(
        response => {
          this.total_ticket_count = response['data']['total_ticket_count'];
          this.total_company_count = response['data']['total_company_count'];
          this.total_user_count = response['data']['total_ticket_count'];
          this.total_content_count = response['data']['total_content_count'];
          this.recent_contents = response['data']['recent_contents'];
        },
        error => {
          console.log(error);
        }
      );
  }

  loadDashboardContent(id: string) {
    this.dashboardService.getDashboardContent(id)
      .subscribe(
        response => {
          this.ticket_count = response['data']['ticket_count'];
          this.avg_age = response['data']['avg_age'];
          this.revenue = response['data']['revenue'];
          this.recent_ticket_types = response['data']['recent_ticket_types'];
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
    console.log('changed content', this.content_oid);
    if(this.content_oid) {
      this.loadDashboardContent(this.content_oid);
    }else {
      this.loadDashboard();
    }
  }

}
