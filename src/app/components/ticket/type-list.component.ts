import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-ticket-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css'],
  providers: []
})
export class TicketTypeListComponent implements OnInit {
  types: Array<Object>;
  query: any = '';
  page: any = 1;
  size: any = 20;
  count: any = 0;
  contents: any;
  content_oid: string;
  is_loading: boolean;

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_loading = true;
    this.contents = [];
    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('query' in params) {
      this.query = params['query'];
    }
    if ('page' in params) {
      this.page = +params['page'];
    }
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
    }
    if (this.content_oid) {
      this.loadTypes(this.query, this.page);
    }
  }

  loadTypes(query: any, page: any) {
    this.is_loading = true;
    this.ticketService.getTypeList(this.content_oid, '', query, (page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.types = response['data'];
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
    this.router.navigate(['/ticket/type', {query: this.query, page: this.page, content_oid: this.content_oid}]);
    this.loadTypes(this.query, this.page);
  }


  onPrev() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/ticket/type', {query: this.query, page: page, content_oid: this.content_oid}]);
    this.loadTypes(this.query, page);
  }

  onNext() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/ticket/type', {query: this.query, page: page, content_oid: this.content_oid}]);
    this.loadTypes(this.query, page);
  }

  search() {
    this.router.navigate(['/ticket/type', {query: this.query, page: this.page, content_oid: this.content_oid}]);
    this.loadTypes(this.query, 1);
  }

  onOrder(id: string) {
    this.router.navigate(['ticket/order', {ticket_type_oid: id}]);
  }

  goNew() {
    this.router.navigate(['/ticket/types/new', {content_oid: this.content_oid}]);
  }

}
