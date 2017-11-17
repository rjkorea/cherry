import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

declare const IMP: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  is_loading: boolean;
  ticket_oid: string;

  constructor() {
    this.is_loading = false;
  }

  ngOnInit() {
  }

  onPurchase() {
    IMP.init(environment.iamport.code);
    IMP.request_pay({
      pg : 'html5_inicis', // version 1.1.0부터 지원.
      pay_method : 'card',
      merchant_uid : this.ticket_oid,
      name : 'WATERBOMB 2017 게스트 초대권 환경부담금',
      amount : 10000,
      buyer_email : 'kevin.cho@rjkorea.com',
      buyer_name : '조건희',
      buyer_tel : '821032697178',
      m_redirect_url : `${environment.app.protocol}://${environment.app.host}:${environment.app.port}/pay`,
    });
  }

}
