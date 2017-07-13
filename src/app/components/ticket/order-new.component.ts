import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-ticket-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css'],
  providers: []
})
export class TicketOrderNewComponent implements OnInit {
  ticket_type_oid: string;
  order: any;
  contents: any;
  countries: any;
  types: any;
  is_fee: boolean;
  fee: any;
  country_code: string;
  mobile_number: string;

  minDate: Date = void 0;
  dateDisabled: {date: Date, mode: string}[];
  expiry: any;

  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('ticket_type_oid' in params) {
      this.ticket_type_oid = params['ticket_type_oid'];
    }
    this.is_fee = false;
    this.fee = {};
    this.expiry = {
      date: new Date()
      // time: new Date()
    };
    this.country_code = '';
    this.mobile_number = '';
    this.order = {
      ticket_type_oid: '',
      qty: 1,
      receiver: {
        name: '',
        mobile_number: ''
      }
    };
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.types = [
      {
        _id: '',
        name: '티켓타입',
        desc: '설명',
        day: '1'
      }
    ];
    this.countries = [
      {
        _id: '',
        name: '국가이름',
        code: '코드'
      }
    ];

    this.loadContents();
    this.loadCountryList();
  }

  changeContent() {
    this.types = [
      {
        _id: '',
        name: '티켓타입',
        desc: '설명',
        day: 'day'
      }
    ];
    this.loadTypes();
  }

  loadTypes() {
    this.ticketService.getTypeList(this.order.content_oid, '', '', 0, 100)
    .subscribe(
      response => {
        this.types = this.types.concat(response['data']);
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

  loadCountryList() {
    this.utilService.getCountryList('', 0, 100)
    .subscribe(
      response => {
        this.countries = this.countries.concat(response['data']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.is_fee) {
      this.order.fee = this.fee;
    }else {
      delete this.order.fee;
    }
    this.order.receiver.mobile_number = this.country_code + this.mobile_number.substr(1);
    this.order.expiry_date = this.getISODate();
    console.log(this.order);
    this.ticketService.addOrder(this.order)
      .subscribe(
        response => {
          alert('티켓오더를 생성하였습니다. \'SMS전송\'버튼을 이용하여 티켓을 전송해주세요.');
          this.router.navigate(['/ticket/order', {ticket_type_oid: this.ticket_type_oid}]);
        },
        error => {
          alert('티켓오더 생성을 실패하였습니다.')
          console.log(error);
        }
      );
  }

  getISODate() {
    return this.expiry.date.getFullYear() + '-' + (this.expiry.date.getMonth() + 1) + '-' + this.expiry.date.getDate() + 'T00:00:00';
      // + 'T' + this.expiry.time.getHours() + ':' + this.expiry.time.getMinutes() + ':' + this.expiry.time.getSeconds();
  }

  disabledSubmit() {
    return !(this.order.content_oid &&
      this.order.ticket_type_oid &&
      this.order.qty &&
      this.order.receiver.name &&
      this.country_code &&
      this.mobile_number &&
      this.expiry.date
    );
  }

}
