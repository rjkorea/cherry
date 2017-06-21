import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { QnaService } from '../../services/qna.service';

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.css'],
  providers: []
})
export class QnaListComponent implements OnInit {
  qnas: Array<Object>;
  content_oid: string = '';
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

  constructor(private qnaService: QnaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    this.loadQnas(this.query, this.page);
  }

  loadQnas(query: any, page: any) {
    this.qnaService.getQnaList(query, (page - 1 ) * this.size, this.size, this.content_oid)
      .subscribe(
        response => {
          this.count = response['count'];
          this.qnas = response['data'];
          window.scrollTo(0, 0);
        },
        error => {
          console.log(error);
        }
      );
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
