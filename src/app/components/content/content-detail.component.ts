import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
  providers: []
})
export class ContentDetailComponent implements OnInit {
  content: any;
  content_form: any;
  notification_options: Object;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private contentService: ContentService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
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
      enabled: this.content.enabled,
      sms: {
        message: this.content.sms.message
      },
      notice: {
        enabled: this.content.notice.enabled,
        message: this.content.notice.message
      }
    };
    this.contentService.updateContent(this.content._id, this.content_form)
      .subscribe(
        response => {
          this.loadContent(this.content._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onCancel() {
    this.loadContent(this.content._id);
    this.edit_mode = false;
  }

  uploadPoster(event) {
    const files: FileList = event.srcElement.files;
    this.contentService.uploadPosterImage(this.content._id, files)
      .subscribe(
        response => {
          console.log(response);
          alert('Complete upload poster image');
        },
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }

}
