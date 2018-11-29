import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: "app-content-new-image",
  templateUrl: "./content-new-image.component.html",
  styleUrls: ["./content-new-image.component.css"],
  providers: []
})
export class ContentNewImageComponent implements OnInit {
  content: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadContent(params["id"]);
  }

  loadContent(id: string) {
    this.contentService.getContent(id).subscribe(
      response => {
        this.content = response["data"];
      },
      error => {
        console.log(error);
      }
    );
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

  goCreateTicket() {
    this.router.navigate(['/ticket', 'types', 'new', { content_oid: this.route.snapshot.params['id']}]);
  }
}
