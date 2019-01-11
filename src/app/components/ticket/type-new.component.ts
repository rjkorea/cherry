import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';


class Validator {
  length: number;
  message: string;
  constructor(
    public max: number,
    public invalid_message: string) {
      this.length = 0;
      this.message = '';
    }

  public onKeyup(value: string) {
    if (value.length > this.max) {
      this.message = this.invalid_message;
    } else {
      this.message = '';
    }
    this.length = value.length;
  }
}

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
  is_free: boolean;
  price: number;
  color: string;
  input_name = new Validator(30, '티켓 이름 입력 최대길이(30 바이트)를 초과 하였습니다.');
  input_desc = new Validator(120, '티켓 설명 입력 최대길이(120 바이트)를 초과 하였습니다.');
  COLORS = {
    tkit_mint: {
      name: 'tkit-mint',
      value: '#62aab8'
    },
    tkit_coral: {
      name: 'tkit-coral',
      value: '#ed7f81'
    },
    hangang_blue: {
      name: 'hangang-blue',
      value: '#6794ca'
    },
    ultra_bora: {
      name: 'ultra-bora',
      value: '#8f6dab'
    },
    mustard_norang: {
      name: 'mustard-norang',
      value: '#f6d87f'
    }
  };

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.is_free = false;
    this.price = 10000;
    this.content = { name: '' };
    this.expiry_date = new Date();
    this.color = 'tkit_mint';
    this.type = {
      type: 'network',
      name: '',
      desc: {
        enabled: false,
        value: ''
      },
      content_oid: '',
      admin_oid: '',
      expiry_date: new Date(),
      color: {},
      duplicated_registration: false
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
    this.type['color'] = this.COLORS[this.color];
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

  clickColor(color: string) {
    this.color = color;
  }

  public disabledSubmit() {
    return !(this.type.content_oid && this.type.name && !this.input_desc.message && !this.input_name.message);
  }

}
