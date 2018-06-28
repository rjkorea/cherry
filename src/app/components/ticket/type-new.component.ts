import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-ticket-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css'],
  providers: []
})
export class TicketTypeNewComponent implements OnInit {
  type: any;
  contents: Array<any> = [];

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.type = {
      name: '',
      desc: {
        enabled: false,
        value: ''
      },
      day: 1,
      price: 0,
      content_oid: '',
      admin_oid: ''
    };
    this.loadContents();
    const params: Params = this.route.snapshot.params;
    console.log(params);
    if ('content_oid' in params) {
      this.type.content_oid = params['content_oid'];
    }
  }

  onSubmit() {
    this.type.admin_oid = localStorage.getItem('_id');
    this.ticketService.addType(this.type)
      .subscribe(
        response => {
          this.router.navigate(['/ticket/type', {content_oid: this.type.content_oid, query: '', page: 1}]);
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
          for (const c of response['data']) {
            this.contents.push({id: c['_id'], text: c['name']})
          }
          console.log(this.contents);
        },
        error => {
          console.log(error);
        }
      );
  }

  public disabledSubmit() {
    return !(this.type.content_oid && this.type.name && this.type.day);
  }

}
