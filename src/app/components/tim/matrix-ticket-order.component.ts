import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TIMService } from '../../services/tim.service';
import { ContentService } from '../../services/content.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tim-matrix-ticket-order',
  templateUrl: './matrix-ticket-order.component.html',
  styleUrls: ['./matrix-ticket-order.component.css']
})
export class MatrixTicketOrderComponent implements OnInit {
  contents: any;
  content_oid: string;
  ticket_orders_stats: any;
  ticket_types: Array<any>;
  select_ticket_types: Array<any>;
  ticket_type_oids: Array<string>;
  count: number;
  sort: string;
  page: number;
  size: number;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private timService: TIMService,
              private ticketService: TicketService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = true;
    this.ticket_types = [];
    this.select_ticket_types = [];
    this.ticket_type_oids = [];
    this.page = 1;
    this.size = 20;
    this.count = 0;
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
      if ('page' in params) {
        this.page = params['page'];
      }
      if ('sort' in params) {
        this.sort = params['sort'];
      }
      if ('ticket_type_oids' in params) {
        this.ticket_type_oids = params['ticket_type_oids'].split(',');
      }
      this.loadRankContent(params['content_oid'], this.ticket_type_oids.join(), this.page, this.sort);
    } else {
      this.is_loading = false;
    }
  }

  loadRankContent(content_oid: string, ticket_type_oids: string, page: number, sort: string) {
    this.is_loading = true;
    this.timService.getMatrixTicketOrderContent(content_oid, ticket_type_oids, (page - 1) * this.size, this.size, sort)
      .subscribe(
        response => {
          this.ticket_orders_stats = response['data'];
          this.count = response['count'];
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
      this.page = 1;
      this.ticket_type_oids = [];
      this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, sort: this.sort, page: this.page }]);
      this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
    } else {
      this.content_oid = '';
      this.router.navigate(['/tim/matrix/ticket/order']);
    }
  }

  onFilterModal() {
    this.ticket_types = [];
    this.select_ticket_types = [];
    this.ticketService.getTypeListV2(this.content_oid, 0, 200).subscribe(
      response => {
        this.ticket_types = response['data'];
        for (let i = 0; i < this.ticket_types.length; i++) {
          this.select_ticket_types.push({enabled: true, ticket_type_oid: this.ticket_types[i]['_id']});
        }
      }
    );
  }

  onTicketTypes(index: number) {
    this.select_ticket_types[index]['enabled'] = !this.select_ticket_types[index]['enabled'];
  }

  onApplyFilter() {
    this.ticket_type_oids = [];
    for (const i in this.select_ticket_types) {
      if (this.select_ticket_types[i]['enabled']) {
        this.ticket_type_oids.push(this.select_ticket_types[i]['ticket_type_oid']);
      }
    }
    this.page = 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), sort: this.sort, page: this.page }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

  onSort(sort: string) {
    this.sort = sort;
    this.page = 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), sort: this.sort, page: this.page }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

  onFirstPage() {
    this.page = 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), page: this.page, sort: this.sort }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

  onPrevPage() {
    this.page = this.page - 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), page: this.page, sort: this.sort }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

  onNextPage() {
    this.page = this.page + 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), page: this.page, sort: this.sort }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

  onEndPage() {
    this.page = Math.floor(this.count / this.size) + 1;
    this.router.navigate(['/tim/matrix/ticket/order', { content_oid: this.content_oid, ticket_type_oids: this.ticket_type_oids.join(), page: this.page, sort: this.sort }]);
    this.loadRankContent(this.content_oid, this.ticket_type_oids.join(), this.page, this.sort);
  }

}
