import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-new',
  templateUrl: './content-new.component.html',
  styleUrls: ['./content-new.component.css'],
  providers: []
})
export class ContentNewComponent implements OnInit {
  content: any;

  constructor(private contentService: ContentService,
              private router: Router) { }

  ngOnInit() {
    this.content = {
      name: '',
      place: '',
      desc: ''
    }
  }

  onSubmit() {
    this.contentService.addContent(this.content)
      .subscribe(
        response => {
          this.router.navigate(['/content']);
        },
        error => {
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.content.name && this.content.place);
  }

}
