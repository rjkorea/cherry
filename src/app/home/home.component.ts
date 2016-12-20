import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin_name: string;
  admin_image: string;
  total_users_count: Number;
  total_visitors_count: Number;
  visits_rate: Number;
  total_revenue: Number;
  notification_unread: Number;

  constructor(private notificationService: NotificationService,
              private dashboardService: DashboardService) { }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.admin_image = localStorage.getItem('image');
    this.total_users_count = 0;
    this.total_visitors_count = 0;
    this.visits_rate = 0.0;
    this.total_revenue = 0;
    this.loadDashboard();
    this.loadNotifications();
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
    this.notificationService.getNotifications(0, 4, localStorage.getItem('_id'))
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

}
