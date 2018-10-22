import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TIMService } from '../../services/tim.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-tim-matrix-ticket-type',
  templateUrl: './matrix-ticket-type.component.html',
  styleUrls: ['./matrix-ticket-type.component.css']
})
export class MatrixTicketTypeComponent implements OnInit {
  contents: any;
  content_oid: string;
  ticket_types_stats: any;
  sort: string;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private timService: TIMService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = true;
    this.sort = 'register';
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];

    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.content_oid = params['content_oid'];
      this.loadMatrixTicketOrder(params['content_oid']);
    } else {
      this.is_loading = false;
    }
  }

  loadMatrixTicketOrder(id: string) {
    this.is_loading = true;
    this.timService.getMatrixTicketTypeContent(id, 0, 20, this.sort)
      .subscribe(
        response => {
          this.ticket_types_stats = response['data'];
          this.is_loading = false;
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

  changeContent() {
    if (this.content_oid) {
      this.router.navigate(['/tim/matrix/ticket/type', { content_oid: this.content_oid, sort: this.sort }]);
      this.loadMatrixTicketOrder(this.content_oid);
    } else {
      this.content_oid = '';
      this.router.navigate(['/tim/matrix/ticket/type']);
    }
  }

  onSort(sort: string) {
    this.sort = sort;
    this.router.navigate(['/tim/matrix/ticket/type', { content_oid: this.content_oid, sort: this.sort }]);
    this.loadMatrixTicketOrder(this.content_oid);
  }

}
