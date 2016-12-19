import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  admin_name: string;
  admin_image: string;
  notification_unread: Number;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.admin_image = localStorage.getItem('image');
    this.loadNotifications();
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
