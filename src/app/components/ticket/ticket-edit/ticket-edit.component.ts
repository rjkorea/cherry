import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from 'app/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { Observable } from 'rxjs';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  @ViewChild('ticketBox') ticketBox: ElementRef;

  isCoverPopup: boolean = false;
  typeCoverPopup: string = '';
  ticket: Object = {};
  content: Object = {};
  sequence$: Observable<Object>;
  typeId: string;

  previewData = [];
  is_loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private ticketService: TicketService,
    private dateFormat: DateTimeFormatPipe
  ) { }

  ngOnInit() {
    this.typeId = this.route.snapshot.paramMap.get('type_oid') || '';
    this.sequence$ = this.getInfoSequence();

    this.sequence$.subscribe(res => {
      this.ticket = res[0]['data'];
      this.content = res[1]['data'];
      this.setPreview('pc');
    })
  }

  getInfoSequence(): Observable<Object> {
    return this.ticketService.getTypeInfoV2(this.typeId).switchMap(res => {
      return this.contentService.getContent(res['data']['content_oid']);
    }, (ticketData, contentData) => [ticketData, contentData]);
  }

  setPreview(type): void {
    const fromDate = this.ticketBox['ticketForm'].get('mFromDate').value || this.ticketBox['ticketForm'].get('pcFromDate').value;
    const toDate = this.ticketBox['ticketForm'].get('mToDate').value || this.ticketBox['ticketForm'].get('pcToDate').value;
    const fromHours = this.ticketBox['ticketForm'].get('fromHours').value;
    const toHours = this.ticketBox['ticketForm'].get('toHours').value;
    const fromMins = this.ticketBox['ticketForm'].get('fromMins').value;
    const toMins = this.ticketBox['ticketForm'].get('toMins').value;

    this.previewData[0] = {
      contentName: this.content['name'],
      name: this.ticketBox['ticketForm'].get('ticketName').value || this.ticket['name'],
      desc: this.ticketBox['ticketForm'].get('ticketDesc').value || this.ticket['desc']['value'],
      sales_date: {
        start: this.dateFormat.transform(this.parseDate(fromDate, fromHours, fromMins).getTime() || this.ticket['sales_date']['start'] * 1000, 'datetime'),
        end: this.dateFormat.transform(this.parseDate(toDate, toHours, toMins).getTime() || this.ticket['sales_date']['end'] * 1000, 'datetime')
      },
      price: Number.parseInt(this.ticket['price']),
      color: this.ticket['color']
    };

    if (type === 'm') {
      this.controlCoverPopup(true, 'preview');
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }

  parseDate(dates, hours, mins): Date {
    let date: Date;

    date = new Date(dates);
    date.setHours(hours);
    date.setMinutes(mins);

    return date;
  }

  done(): void {
    const fromDate = this.ticketBox['ticketForm'].get('mFromDate').value || this.ticketBox['ticketForm'].get('pcFromDate').value;
    const toDate = this.ticketBox['ticketForm'].get('mToDate').value || this.ticketBox['ticketForm'].get('pcToDate').value;
    const fromHours = this.ticketBox['ticketForm'].get('fromHours').value;
    const toHours = this.ticketBox['ticketForm'].get('toHours').value;
    const fromMins = this.ticketBox['ticketForm'].get('fromMins').value;
    const toMins = this.ticketBox['ticketForm'].get('toMins').value;
    const param = {
      name : this.ticketBox['ticketForm'].get('ticketName').value,
      desc : this.ticketBox['ticketForm'].get('ticketDesc').value,
      sales_date : {
        start: this.dateFormat.transform(this.parseDate(fromDate, fromHours, fromMins).getTime(), 'apiDate'),
        end: this.dateFormat.transform(this.parseDate(toDate, toHours, toMins).getTime(), 'apiDate')
      },
      fpfg : {
        limit : this.ticketBox['ticketForm'].get('ticketCount').value,
        spread : this.ticketBox['ticketForm'].get('ticketSpread').value
      }
    };

    this.is_loading = true;

    if (param.name || param.desc || param.sales_date.start || param.sales_date.end || param.fpfg.limit) {
      this.ticketService.updateTicketTypeV2(this.typeId, param).subscribe(res => {
        this.is_loading = false;
        this.router.navigate([`ticket/types/${this.content['_id']}`]);
      }, err => {
        this.is_loading = false;
        console.log(err);
      });
    } else {
      this.is_loading = false;
      alert('필수정보를 모두 입력해주세요');
    }
  }
}
