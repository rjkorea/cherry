import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QnaService } from '../../services/qna.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-qna-new',
  templateUrl: './qna-new.component.html',
  styleUrls: ['./qna-new.component.css'],
  providers: []
})
export class QnaNewComponent implements OnInit {
  qna: any;
  contents: object[];

  constructor(private qnaService: QnaService,
              private contentService: ContentService,
              private router: Router) { }

  ngOnInit() {
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.qna = {
      question: '',
      answer: '',
      content_oid: ''
    };
    this.loadContents();
  }

  onSubmit() {
    this.qnaService.addQna(this.qna)
      .subscribe(
        response => {
          this.router.navigate(['/qna']);
        },
        error => {
          console.log(error);
        }
      );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = this.contents.concat(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  public disabledSubmit() {
    return !(this.qna.content_oid && this.qna.question && this.qna.answer);
  }

}
