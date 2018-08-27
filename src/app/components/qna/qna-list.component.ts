import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { QnaService } from '../../services/qna.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.css'],
  providers: []
})
export class QnaListComponent implements OnInit {
  qnas: object[];
  content_oid: string;
  contents: any;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;
  is_loading: boolean;

  constructor(private qnaService: QnaService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    this.content_oid = '';
    this.contents = [];
    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('content_oid') {
      this.content_oid = params['content_oid'];
    }
    if (this.content_oid) {
      this.loadQnas(this.query, this.page);
    }
  }

  loadQnas(query: any, page: any) {
    this.is_loading = true;
    this.qnaService.getQnaList(query, (page - 1 ) * this.size, this.size, this.content_oid)
      .subscribe(
        response => {
          this.count = response['count'];
          this.qnas = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  changeContent() {
    this.page = 1;
    this.router.navigate(['/qna', {query: this.query, page: this.page}]);
    this.loadQnas(this.query, this.page);
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/qna', {query: this.query, page: page}]);
    this.loadQnas(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/qna', {query: this.query, page: page}]);
    this.loadQnas(this.query, page);
  }

  search() {
    this.router.navigate(['/qna', {query: this.query, page: this.page}]);
    this.loadQnas(this.query, 1);
  }

}
