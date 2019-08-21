import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { UtilService } from '../../services/util.service';
import { AuthService } from '../../services/auth.service';

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
  type_info: any;
  parsed_csv: any;
  is_loading: boolean;

  constructor(private ticketService: TicketService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    if ('ticket_type_oid' in params) {
      this.ticket_type_oid = params['ticket_type_oid'];
    }
    this.is_loading = false;
    this.order = {
      ticket_type_oid: this.ticket_type_oid,
      qty: 1,
      name: '',
      mobile: {
        country_code: DEFAULT_COUNTRY_CODE,
        number: ''
      },
      sms: ''
    };
    this.countries = [
      {
        _id: '',
        name: '국가이름',
        code: '코드'
      }
    ];
    this.loadType(this.ticket_type_oid);
    this.loadTypeInfo(this.ticket_type_oid);
    this.loadCountryList();

  }

  loadType(id: string) {
    this.ticketService.getType(id)
      .subscribe(
        response => {
          this.type = response['data'];
          this.order.sms = this.type.content.sms.message;
        },
        error => {
          alert(error.message);
          console.log(error);
        }
      );
  }

  loadTypeInfo(id: string) {
    this.ticketService.getTypeInfo(id)
      .subscribe(
        response => {
          this.type_info = response['data'];
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
    if (!this.order.mobile.number.startsWith('010')) {
      alert('핸드폰번호는 010부터 입력해주세요.');
      return;
    }
    this.is_loading = true;
    this.order['mobile']['number'] = this.order['mobile']['number'].trim().replace(/\./g, '').replace(/\s/g, '').replace(/-/g, '');
    this.ticketService.addOrderV2(this.order)
      .subscribe(
        response => {
          alert('티켓전송을 성공 하였습니다.');
          this.router.navigate(['/ticket/type', this.type['content']['_id']]);
        },
        error => {
          let message = '티켓전송을 실패 하였습니다.';
          if (error.error.code === 1) {
            message = '시스템에서 티켓발송 최대수량은 10,000매 입니다.';
          }
          alert(message);
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  goLoadCsv() {
    this.router.navigate(['/ticket/orders/load/csv', {ticket_type_oid: this.ticket_type_oid}]);
  }

  disabledSubmit() {
    return !(this.order.qty && this.order.name && this.order.mobile.country_code && this.order.mobile.number && this.order.sms);
  }

  checkRole() {
    return this.authService.getRole();
  }

}
