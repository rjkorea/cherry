import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  providers: []
})
export class ContentListComponent implements OnInit {
  contents: Array<Object>;
  notification_options: Object;
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

  constructor(private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.loadContents(this.query, this.page);
  }

  loadContents(query:any, page: any) {
    this.contentService.getContentList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.contents = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/content', {query: this.query, page: page}]);
    this.loadContents(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/content', {query: this.query, page: page}]);
    this.loadContents(this.query, page);
  }

  search() {
    this.router.navigate(['/content', {query: this.query, page: this.page}]);
    this.loadContents(this.query, 1);
  }

}
