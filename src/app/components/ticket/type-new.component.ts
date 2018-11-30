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
  content: any;
  ticket_type: any;
  ticket_types: any;
  is_mobile: boolean;

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (navigator.userAgent.toLowerCase().includes('mobile')) {
      this.is_mobile = true;
    }
    this.ticket_types = [
      { name: '일반티켓', value: 'general' },
      { name: '네트워크티켓', value: 'network' },
    ];
    this.type = {
      type: '',
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
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.type.content_oid = params['content_oid'];
    }
    this.loadContent(this.type.content_oid);
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

  loadContent(id: string) {
    this.contentService.getContent(id)
      .subscribe(
        response => {
          this.content = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  changeTicketType() {
    this.type.type = this.ticket_type;
  }

  public disabledSubmit() {
    return !(this.type.content_oid && this.type.name);
  }

}
