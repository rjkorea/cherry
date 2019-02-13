import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
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
  when_datetime_range: Date[];
  edit_mode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadContent(params['id']);
    this.edit_mode = false;
  }

  loadContent(id: string) {
    this.contentService.getContent(id).subscribe(
      response => {
        this.content = response['data'];
        this.when_datetime_range = [
          new Date(this.content['when']['start'] * 1000),
          new Date(this.content['when']['end'] * 1000)
        ];
      },
      error => {
        console.log(error);
      }
    );
  }

  goTicket(content_oid: string) {
    this.router.navigate(['/ticket', 'type', { content_oid: this.content['_id'] }]);
  }

  goGroup() {
    this.router.navigate(['/content', this.route.snapshot.params['id'], 'groups']);
  }

  goEntrance(content_oid: string) {
    this.router.navigate(['/entrance', { content_oid: this.content['_id'] }]);
  }

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.content_form = {
      name: this.content.name,
      desc: this.content.desc,
      place: {
        name: this.content.place.name
      },
      enabled: this.content.enabled,
      sms: {
        message: this.content.sms.message
      },
      notice: {
        enabled: this.content.notice.enabled,
        message: this.content.notice.message
      },
      when: {
        start: `${this.when_datetime_range[0].getUTCFullYear()}-${this.when_datetime_range[0].getUTCMonth() + 1}-${this.when_datetime_range[0].getUTCDate()}T${this.when_datetime_range[0].getUTCHours()}:${this.when_datetime_range[0].getUTCMinutes()}:${this.when_datetime_range[0].getUTCSeconds()}`,
        end: `${this.when_datetime_range[1].getUTCFullYear()}-${this.when_datetime_range[1].getUTCMonth() + 1}-${this.when_datetime_range[1].getUTCDate()}T${this.when_datetime_range[1].getUTCHours()}:${this.when_datetime_range[1].getUTCMinutes()}:${this.when_datetime_range[1].getUTCSeconds()}`
      }
    };
    this.contentService
      .updateContent(this.content._id, this.content_form)
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

  uploadPoster(files: FileList) {
    this.contentService
      .uploadPosterImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }

  uploadLogo(files: FileList) {
    this.contentService
      .uploadLogoImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }

  uploadOg(files: FileList) {
    this.contentService
      .uploadOgImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }

  uploadExtra(num: string, files: FileList) {
    this.contentService
      .uploadExtraImage(this.content._id, num, files.item(0))
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error.message);
        }
      );
  }

}
