import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {RfidService} from '../../services/rfid.service';

@Component({
  selector: 'app-entrance-ticket',
  templateUrl: './entrance-ticket.component.html',
  styleUrls: ['./entrance-ticket.component.css'],
  providers: []
})
export class EntranceTicketComponent implements OnInit, AfterContentInit {
  ticket: any;
  ticket_form: any;
  methods: string[];
  user_form: any;
  band_uid: string;
  gender: string;
  birthday: string;
  disabled_banduid: boolean;
  is_loading: boolean;
  ENG_KEY = 'rRseEfaqQtTdwWczxvgkoiOjpuPhynbml';
  KOR_KEY = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ';
  CHO_DATA = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  JUNG_DATA = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  JONG_DATA = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

  @ViewChild('banduid') _banduidElement: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rfidService: RfidService,
              private ticketService: TicketService) {
  }

  ngOnInit() {
    this.disabled_banduid = false;
    this.is_loading = false;
    const params: Params = this.route.snapshot.params;
    this.loadTicket(params['id']);
    if (this._banduidElement) {
      this._banduidElement.nativeElement.focus();
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this._banduidElement) {
        this._banduidElement.nativeElement.focus();
      }
    }, 800);

  }

  loadTicket(id: string) {
    this.ticketService.getTicket(id)
      .subscribe(
        response => {
          this.ticket = response['data'];

        },
        error => {
          console.log(error);
        }
      );
  }

  onDoneEntrance() {
    this.ticketService.updateEnterTicket(this.ticket._id)
      .subscribe(
        response => {
          this.router.navigate(['/entrance', {'content_oid': this.ticket['content']['_id']}]);
        },
        error => {
          console.log(error);
        }
      );
  }

  syncRfidUmfkorea() {
    const {gender, birthday} = this.ticket['receive_user'];

    this.is_loading = true;
    if (!gender || !birthday) {
      if (!this.gender || !this.birthday) {
        alert('성별 혹은 태어난 년도 네자리를 넣어주세요.');
        this.is_loading = false;
        return;
      }
    }

    const payload = {
      uid: this.korTypeToEng(this.band_uid),
      user: {
        name: this.ticket['receive_user']['name'],
        mobile: this.ticket['receive_user']['mobile'],
        gender: this.ticket['receive_user']['gender'] ? gender : this.gender,
        birthday: this.ticket['receive_user']['birthday'] ? birthday : this.birthday
      },
      ticket: {
        _id: this.ticket['_id'],
        name: this.ticket['ticket_type']['name'],
        desc: this.ticket['ticket_type']['desc']['value']
      }
    };
    this.rfidService.syncUmfkorea(payload)
      .subscribe(
        response => {
          this.is_loading = false;
          alert('밴드를 등록하였습니다');
          this.router.navigate(['/entrance', {content_oid: this.ticket['content']['_id']}]);
        },
        error => {
          this.is_loading = false;
          alert('유효하지 않은 밴드입니다');
          this.disabled_banduid = false;
          this.band_uid = '';
          console.log(error);
        }
      );
  }

  touchBand(event: any) {
    if (event.keyCode === 13) {
      this.disabled_banduid = true;
      this.syncRfidUmfkorea();
    }
  }

  korTypeToEng(src) {
    let res = '';
    if (src.length == 0) {
      return res;
    }

    for (let i = 0; i < src.length; i++) {
      const ch = src.charAt(i);
      let nCode = ch.charCodeAt(0);
      const nCho = this.CHO_DATA.indexOf(ch), nJung = this.JUNG_DATA.indexOf(ch), nJong = this.JONG_DATA.indexOf(ch);
      const arrKeyIndex = [-1, -1, -1, -1, -1];

      if (0xac00 <= nCode && nCode <= 0xd7a3) {
        nCode -= 0xac00;
        arrKeyIndex[0] = Math.floor(nCode / (21 * 28));			// 초성
        arrKeyIndex[1] = Math.floor(nCode / 28) % 21;			// 중성
        arrKeyIndex[3] = nCode % 28 - 1;						// 종성
      } else if (nCho != -1) {
        arrKeyIndex[0] = nCho;
      } else if (nJung != -1) {
        arrKeyIndex[1] = nJung;
      } else if (nJong != -1) {
        arrKeyIndex[3] = nJong;
      } else {
        res += ch;
      }

      // 실제 Key Index로 변경. 초성은 순서 동일
      if (arrKeyIndex[1] != -1) {
        if (arrKeyIndex[1] == 9) {					// ㅘ
          arrKeyIndex[1] = 27;
          arrKeyIndex[2] = 19;
        } else if (arrKeyIndex[1] == 10) {			// ㅙ
          arrKeyIndex[1] = 27;
          arrKeyIndex[2] = 20;
        } else if (arrKeyIndex[1] == 11) {			// ㅚ
          arrKeyIndex[1] = 27;
          arrKeyIndex[2] = 32;
        } else if (arrKeyIndex[1] == 14) {			// ㅝ
          arrKeyIndex[1] = 29;
          arrKeyIndex[2] = 23;
        } else if (arrKeyIndex[1] == 15) {			// ㅞ
          arrKeyIndex[1] = 29;
          arrKeyIndex[2] = 24;
        } else if (arrKeyIndex[1] == 16) {			// ㅟ
          arrKeyIndex[1] = 29;
          arrKeyIndex[2] = 32;
        } else if (arrKeyIndex[1] == 19) {			// ㅢ
          arrKeyIndex[1] = 31;
          arrKeyIndex[2] = 32;
        } else {
          arrKeyIndex[1] = this.KOR_KEY.indexOf(this.JUNG_DATA.charAt(arrKeyIndex[1]));
          arrKeyIndex[2] = -1;
        }
      }
      if (arrKeyIndex[3] != -1) {
        if (arrKeyIndex[3] == 2) {					// ㄳ
          arrKeyIndex[3] = 0;
          arrKeyIndex[4] = 9;
        } else if (arrKeyIndex[3] == 4) {			// ㄵ
          arrKeyIndex[3] = 2;
          arrKeyIndex[4] = 12;
        } else if (arrKeyIndex[3] == 5) {			// ㄶ
          arrKeyIndex[3] = 2;
          arrKeyIndex[4] = 18;
        } else if (arrKeyIndex[3] == 8) {			// ㄺ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 0;
        } else if (arrKeyIndex[3] == 9) {			// ㄻ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 6;
        } else if (arrKeyIndex[3] == 10) {			// ㄼ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 7;
        } else if (arrKeyIndex[3] == 11) {			// ㄽ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 9;
        } else if (arrKeyIndex[3] == 12) {			// ㄾ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 16;
        } else if (arrKeyIndex[3] == 13) {			// ㄿ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 17;
        } else if (arrKeyIndex[3] == 14) {			// ㅀ
          arrKeyIndex[3] = 5;
          arrKeyIndex[4] = 18;
        } else if (arrKeyIndex[3] == 17) {			// ㅄ
          arrKeyIndex[3] = 7;
          arrKeyIndex[4] = 9;
        } else {
          arrKeyIndex[3] = this.KOR_KEY.indexOf(this.JONG_DATA.charAt(arrKeyIndex[3]));
          arrKeyIndex[4] = -1;
        }
      }

      for (let j = 0; j < 5; j++) {
        if (arrKeyIndex[j] != -1) {
          res += this.ENG_KEY.charAt(arrKeyIndex[j]);
        }
      }
    }

    return res;
  }
}
