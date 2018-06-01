import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  providers: []
})
export class ContentListComponent implements OnInit {
  contents: Content[];
  query: any = '';
  page: any = 1;
  size: any = 9;
  count: any = 0;

  is_loading: boolean;
  error_message: string;

  constructor(private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    this.error_message = '';
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    this.loadContents(this.query, this.page);
  }

  loadContents(query: any, page: any) {
    this.is_loading = true;
    this.contentService.getContentList(query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.contents = response['data'];
          window.scrollTo(0, 0);
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.error_message = error;
          this.is_loading = false;
        }
      );
  }

  goTicket(content_oid: string) {
    this.router.navigate(['/ticket', 'type', {content_oid: content_oid}]);
  }

  goGroup(content_oid: string) {
    this.router.navigate(['/content', content_oid, 'groups']);
  }

  goEntrance(content_oid: string) {
    this.router.navigate(['/entrance', {content_oid: content_oid}]);
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
