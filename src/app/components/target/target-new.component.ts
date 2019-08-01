import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentService } from '../../services/content.service';
import { TicketService } from '../../services/ticket.service';
import { TargetService } from '../../services/target.service';

enum State {
  Init, Loading, Done
}

@Component({
  selector: 'app-target-new',
  templateUrl: './target-new.component.html',
  styleUrls: ['./target-new.component.css']
})
export class TargetNewComponent implements OnInit {
  StateEnum = State;
  state: State;
  contents: Array<any>;
  query: string;
  content_oid: string;
  ticket_types: Array<any>;
  select_ticket_types: Array<any>;
  filters: any;
  target_count: any;
  is_analyze: boolean;
  is_send: boolean;
  sms: any;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private targetService: TargetService,
    private ticketService: TicketService) { }

  ngOnInit() {
    this.state = this.StateEnum.Init;
    this.filters = {
      send: true,
      register: true,
      pay: true,
      use: true,
      cancel: true
    };
    this.sms = {
      title: '',
      message: ''
    }
    this.contents = [];
    this.ticket_types = [];
    this.select_ticket_types = [];
    this.target_count = null;
    this.is_analyze = false;
    this.is_send = false;
    this.content_oid = '';
    this.query = '';
    this.getContent();
  }

  getContent() {
    this.state = this.StateEnum.Loading;
    this.contentService.getContentList(this.query, 0, 12)
      .subscribe(
        response => {
          this.contents = response['data'];
          this.state = this.StateEnum.Done;
        },
        error => {
          console.log(error);
          this.state = this.StateEnum.Done;
        }
      );
  }

  setContent(id: string) {
    this.select_ticket_types = [];
    this.ticket_types = [];
    this.target_count = null;
    this.content_oid = id;
    this.contents = this.contents.filter(function(value, index, arr) {
      return value._id === id;
    });
    this.ticketService.getTypeListV2(this.content_oid, 0, 200)
      .subscribe(
        response => {
          this.ticket_types = response['data'];
          for (let i = 0; i < this.ticket_types.length; i++) {
            this.select_ticket_types.push({enabled: true, ticket_type_oid: this.ticket_types[i]['_id']});
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  onTicketTypes(index: number) {
    this.select_ticket_types[index]['enabled'] = !this.select_ticket_types[index]['enabled'];
  }

  onSearch() {
    this.select_ticket_types = [];
    this.ticket_types = [];
    this.target_count = null;
    this.content_oid = '';
    this.getContent();
  }

  onAllTicketType() {
    this.select_ticket_types.forEach(element => {
      element['enabled'] = true;
    });
  }

  onClearTicketType() {
    this.select_ticket_types.forEach(element => {
      element['enabled'] = false;
    });
  }

  onFilter(status: string) {
    this.filters[status] = !this.filters[status];
  }

  onAnalyze() {
    this.is_analyze = true;
    this.target_count = null;
    const ticket_type_oids = [];
    for (const i in this.select_ticket_types) {
      if (this.select_ticket_types[i]['enabled']) {
        ticket_type_oids.push(this.select_ticket_types[i]['ticket_type_oid']);
      }
    }
    const status = [];
    for (const k in this.filters) {
      if (this.filters[k]) {
        status.push(k);
      }
    }
    this.targetService.getTargetCount(this.content_oid, ticket_type_oids.join(), status.join())
      .subscribe(
        response => {
          this.target_count = response['count'];
          this.is_analyze = false;
        },
        error => {
          this.is_analyze = false;
          console.log(error);
        }
      );
  }

  onSend() {
    this.is_send = true;
    const ticket_type_oids = [];
    for (const i in this.select_ticket_types) {
      if (this.select_ticket_types[i]['enabled']) {
        ticket_type_oids.push(this.select_ticket_types[i]['ticket_type_oid']);
      }
    }
    const status = [];
    for (const k in this.filters) {
      if (this.filters[k]) {
        status.push(k);
      }
    }
    const payload = {
      content_oid: this.content_oid,
      sms: this.sms,
      ticket_type_oids: ticket_type_oids,
      status: status
    };
    this.targetService.sendTarget(payload)
      .subscribe(
        response => {
          alert(`${response['data']['count']}명에게 전송, ${response['data']['success']}명에게 전송성공, ${response['data']['count']-response['data']['success']}명에게 전송실패`);
          this.is_send = false;
          this.router.navigate(['/target']);
        },
        error => {
          console.log(error);
          this.is_send = false;
        }
      );
  }
}
