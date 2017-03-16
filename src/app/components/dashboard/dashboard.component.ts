import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin_name: string;
  total_users_count: Number;
  total_visitors_count: Number;
  visits_rate: Number;
  total_revenue: Number;
  notification_unread: Number;
  is_mobile: boolean;

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

  constructor(private notificationService: NotificationService,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.total_users_count = 0;
    this.total_visitors_count = 0;
    this.visits_rate = 0.0;
    this.total_revenue = 0;
    this.loadDashboard();
    this.loadNotifications();
    this.is_mobile = true;
  }

  loadDashboard() {
    this.dashboardService.getDashboard()
      .subscribe(
        response => {
          this.total_users_count = response['data']['total_users_count'];
          this.total_visitors_count = response['data']['total_visitors_count'];
          this.total_revenue = response['data']['total_visitors_fee_count'] * 10000;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 4)
      .subscribe(
        response => {
          this.notification_unread = response['unread_count'];
          console.log(this.notification_unread);
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleMobile() {
    if(this.is_mobile) {
      this.is_mobile = false;
    }else {
      this.is_mobile = true;
    }
  }

}
