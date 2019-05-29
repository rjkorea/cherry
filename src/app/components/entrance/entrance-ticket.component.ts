import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { RfidService } from '../../services/rfid.service';

@Component({
  selector: 'app-entrance-ticket',
  templateUrl: './entrance-ticket.component.html',
  styleUrls: ['./entrance-ticket.component.css'],
  providers: []
})
export class EntranceTicketComponent implements OnInit, AfterViewInit {
  ticket: any;
  ticket_form: any;
  methods: string[];
  user_form: any;
  band_uid: string;
  disabled_banduid: boolean;
  is_loading: boolean;

  @ViewChild('banduid') _banduidElement: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rfidService: RfidService,
              private ticketService: TicketService) { }

  ngOnInit() {
    this.disabled_banduid = false;
    this.is_loading = false;
    const params: Params = this.route.snapshot.params;
    this.loadTicket(params['id']);
    this._banduidElement.nativeElement.focus();
  }

  ngAfterViewInit() {
    this._banduidElement.nativeElement.focus();
  }

  loadTicket(id: string) {
    this.ticketService.getTicket(id)
      .subscribe(
        response => {
          this.ticket = response['data'];
          console.log(this.ticket);
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
    this.is_loading = true;
    const payload = {
      uid: this.band_uid,
      user: {
        name: this.ticket['receive_user']['name'],
        mobile: this.ticket['receive_user']['mobile'],
        gender: this.ticket['receive_user']['gender'],
        birthday: this.ticket['receive_user']['birthday']
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
          this.router.navigate(['/entrance', { content_oid: this.ticket['content']['_id'] }]);
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

}
