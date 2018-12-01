import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { UtilService } from '../../services/util.service';

const DEFAULT_COUNTRY_CODE: string = '82';

@Component({
  selector: 'app-ticket-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css'],
  providers: []
})
export class TicketOrderNewComponent implements OnInit {
  ticket_type_oid: string;
  order: any;
  countries: any;
  type: any;
  fee: any;
  country_code: string;
  mobile_number: string;

  expiry: any;

  constructor(private ticketService: TicketService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('ticket_type_oid' in params) {
      this.ticket_type_oid = params['ticket_type_oid'];
    }
    this.fee = {
      method: 'cash',
      price: 10000
    };
    this.expiry = {
      date: new Date(),
      time: new Date()
    };
    this.country_code = DEFAULT_COUNTRY_CODE;
    this.mobile_number = '';
    this.order = {
      ticket_type_oid: '',
      qty: 1,
      receiver: {
        name: '',
        mobile_number: ''
      }
    };
    this.countries = [
      {
        _id: '',
        name: '국가이름',
        code: '코드'
      }
    ];
    this.loadType();
    this.loadCountryList();
  }

  loadType() {
    this.ticketService.getType(this.ticket_type_oid)
      .subscribe(
        response => {
          this.type = response['data'];
        },
        error => {
          alert(error.message);
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
    console.log(this.type);
    this.order.ticket_type_oid = this.ticket_type_oid;
    this.order.content_oid = this.type.content._id;
    this.order.receiver.name = this.order.receiver.name.trim();
    this.order.receiver.mobile_number = this.country_code + this.mobile_number.replace(/ /g, '').replace(/-/g, '').substr(1);
    this.order.fee = {
      method: 'cash',
      price: this.type.price
    };
    this.order.expiry_date = this.type.expiry_date;
    console.log(this.order);
    this.ticketService.addOrder(this.order)
      .subscribe(
        response => {
          alert('티켓전송을 생성하였습니다. \'SMS전송\'버튼을 이용하여 티켓을 전송해주세요.');
          this.router.navigate(['/ticket/order', {ticket_type_oid: this.order.ticket_type_oid}]);
        },
        error => {
          alert('티켓전송 생성을 실패하였습니다.');
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.order.qty && this.order.receiver.name && this.country_code && this.mobile_number);
  }

}
