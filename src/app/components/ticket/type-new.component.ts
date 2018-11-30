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
  expiry_date: Date;
  is_mobile: boolean;
  is_free: boolean;

  price: number;

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (navigator.userAgent.toLowerCase().includes('mobile')) {
      this.is_mobile = true;
    } else {
      this.is_mobile = false;
    }
    this.is_free = false;
    this.price = 10000;
    this.content = { name: '' };
    this.expiry_date = new Date();
    this.type = {
      type: 'network',
      name: '',
      desc: {
        enabled: false,
        value: ''
      },
      content_oid: '',
      admin_oid: '',
      expiry_date: new Date()
    };
    const params: Params = this.route.snapshot.params;
    if ('content_oid' in params) {
      this.type.content_oid = params['content_oid'];
    }
    this.loadContent(this.type.content_oid);
  }

  onDone() {
    this.type.admin_oid = localStorage.getItem('_id');
    if (!this.is_free) {
      this.type['price'] = this.price;
    }
    this.type.expiry_date = `${this.expiry_date.getUTCFullYear()}-${this.expiry_date.getUTCMonth() + 1}-${this.expiry_date.getUTCDate()}T${this.expiry_date.getUTCHours()}:${this.expiry_date.getUTCMinutes()}:${this.expiry_date.getUTCSeconds()}`;
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

  public disabledSubmit() {
    return !(this.type.content_oid && this.type.name);
  }

}
