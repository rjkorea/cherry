import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-new-image',
  templateUrl: './content-new-image.component.html',
  styleUrls: ['./content-new-image.component.css'],
  providers: []
})
export class ContentNewImageComponent implements OnInit {
  content: any;
  is_loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.is_loading = true;
    const params: Params = this.route.snapshot.params;
    this.loadContent(params['id']);
  }

  loadContent(id: string) {
    this.is_loading = true;
    this.contentService.getContent(id).subscribe(
      response => {
        this.content = response['data'];
        this.is_loading = false;
      },
      error => {
        this.is_loading = false;
        alert(error.message);
      }
    );
  }

  uploadPoster(files: FileList) {
    this.is_loading = true;
    this.contentService
      .uploadPosterImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          this.content.image.poster.m = response['data']['image.poster.m'];
          this.is_loading = false;
        },
        error => {
          this.is_loading = false;
          alert(error.message);
        }
      );
  }

  uploadLogo(files: FileList) {
    this.is_loading = true;
    this.contentService
      .uploadLogoImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          this.content.image.logo.m = response['data']['image.logo.m'];
          this.is_loading = false;
        },
        error => {
          this.is_loading = false;
          alert(error.message);
        }
      );
  }

  uploadOg(files: FileList) {
    this.is_loading = true;
    this.contentService
      .uploadOgImage(this.content._id, files.item(0))
      .subscribe(
        response => {
          this.content.image.og.m = response['data']['image.og.m'];
          this.is_loading = false;
        },
        error => {
          this.is_loading = false;
          alert(error.message);
        }
      );
  }

  uploadExtra(num: string, files: FileList) {
    this.is_loading = true;
    this.contentService
      .uploadExtraImage(this.content._id, num, files.item(0))
      .subscribe(
        response => {
          this.content.image.extra[Number(num)].m = response['data'][`image.extra.${num}.m`];
          this.is_loading = false;
        },
        error => {
          this.is_loading = false;
          alert(error.message);
        }
      );
  }

  goCreateTicket() {
    this.router.navigate(['/ticket', 'types', 'new', {content_oid: this.route.snapshot.params['id']}]);
  }

  checkDefaultImage(image: string) {
    if (image.indexOf('default') > 0) {
      return true;
    } else {
      return false;
    }
  }
}
