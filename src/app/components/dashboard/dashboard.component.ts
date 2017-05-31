import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private total_ticket_count: number;
  private total_company_count: number;
  private total_user_count: number;
  private total_content_count: number;

  private recent_contents;

  private contents: any;
  private content_oid: string;

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

  constructor(private dashboardService: DashboardService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.recent_contents = [
      { name: '', _id: '' },
      { name: '', _id: '' },
      { name: '', _id: '' },
      { name: '', _id: '' },
      { name: '', _id: '' }
    ];
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

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = response['data'];
          console.log(this.contents);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeContent() {
    console.log('changed content', this.content_oid);
  }

}
