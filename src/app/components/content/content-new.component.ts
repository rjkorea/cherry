import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-content-new',
  templateUrl: './content-new.component.html',
  styleUrls: ['./content-new.component.css'],
  providers: [NotificationsService]
})
export class ContentNewComponent implements OnInit {
  content: any;
  notification_options: Object;

  constructor(private contentService: ContentService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.content = {
      name: '',
      place: '',
      desc: ''
    }
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  onSubmit() {
    this.contentService.addContent(this.content)
      .subscribe(
        response => {
          this.router.navigate(['/content']);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.content.name && this.content.place);
  }

}
