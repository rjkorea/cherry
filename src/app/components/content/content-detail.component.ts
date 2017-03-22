import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
  providers: [NotificationsService]
})
export class ContentDetailComponent implements OnInit {
  content: any;
  content_form: any;
  notification_options: Object;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private contentService: ContentService,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.loadContent(params['id']);
    this.edit_mode = false;
  }

  loadContent(id: string) {
    this.contentService.getContent(id)
      .subscribe(
        response => {
          this.content = response['data'];
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

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.content_form = {
      name: this.content.name,
      desc: this.content.desc,
      place: this.content.place,
      enabled: this.content.enabled
    }
    this.contentService.updateContent(this.content._id, this.content_form)
      .subscribe(
        response => {
          this.loadContent(this.content._id);
          this.edit_mode = false;
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

  onCancel() {
    this.loadContent(this.content._id);
    this.edit_mode = false;
  }

}
