import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ticket-load-csv',
  templateUrl: './ticket-load-csv.component.html',
  styleUrls: ['./ticket-load-csv.component.css']
})
export class TicketLoadCsvComponent implements OnInit {
  parsed_csv: any;
  ticket_type_oid: string;
  data: any;
  is_uploading: boolean;
  send_kakaotalk: boolean;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.is_uploading = false;
    this.send_kakaotalk = true;
    const params: Params = this.route.snapshot.params;
    if ('ticket_type_oid' in params) {
      this.ticket_type_oid = params['ticket_type_oid'];
    }
  }

  checkRole() {
    return this.authService.getRole();
  }

  loadCSV(files: FileList) {
    this.parsed_csv = {
      file: {
        name: '',
        size: '',
        type: ''
      },
      headers: ['name', 'mobile_number', 'qty'],
      data: [],
      count: 0
    };
    const file: File = files.item(0);
    this.parsed_csv.file.name = file.name;
    this.parsed_csv.file.size = file.size;
    this.parsed_csv.file.type = file.type;
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const data: string = reader.result as string;
      const splitted = data.split('\n');
      this.parsed_csv['headers'] = splitted[0].trim().split(',');
      if (this.parsed_csv['headers'][0] === 'name' && this.parsed_csv['headers'][1] === 'mobile_number' && this.parsed_csv['headers'][2] === 'qty') {
        splitted.shift();
        for (const l of splitted) {
          const line = l.trim().split(',');
          if (line.length !== 3) {
            alert('형식이 올바르지 않습니다.');
            return;
          }
          if (line[1].startsWith('010')) {
            this.parsed_csv['data'].push(
              {
                name: line[0].trim(),
                mobile_number: line[1].trim().replace(/\./g, '').replace(/\s/g, '').replace(/-/g, ''),
                qty: Number(line[2])
              }
            );
          } else {
            alert('핸드폰 번호의 형식이 올바르지 않습니다. (010부터 입력해주세요)');
            return;
          }
        }
          this.parsed_csv.count = this.parsed_csv.data.length;
        if (this.parsed_csv.count > 1000) {
          alert(`티켓 최대전송 대상자수는 1,000명 입니다. 현재 전송자수 ${this.parsed_csv.count}명`)
        }
      } else {
        alert(`CSV 파일의 컬럼명이 유효(name, mobile_number, qty)하지 않습니다. (현재파일의 컬럼명: ${this.parsed_csv['headers'][0]}, ${this.parsed_csv['headers'][1]}, ${this.parsed_csv['headers'][2]})`);
      }
    }
  }

  uploadCsv() {
    this.is_uploading = true;
    this.data = {
      ticket_type_oid: this.ticket_type_oid,
      users: this.parsed_csv.data,
      send_kakaotalk: this.send_kakaotalk
    }
    this.ticketService.createTicketOrderCsvV2(this.data)
      .subscribe(
        response => {
          alert(`${response['data']['ticket_type_name']}을 ${response['data']['user_count']}명의 유저에게 전송하였습니다.`);
          this.router.navigate(['/ticket/order', {ticket_type_oid: response['data']['ticket_type_oid']}]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
