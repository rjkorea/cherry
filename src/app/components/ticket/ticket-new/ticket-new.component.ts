import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/services/ticket.service';
import { PopupService } from 'app/services/popup.service';
import { TicketBoxComponent } from '../ticket-box/ticket-box.component';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {
  @ViewChild('ticketBoxs', { read: ViewContainerRef }) ticketBoxs: ViewContainerRef;

  contentId: string;
  maxTickets10: number = 10;
  saveTickets = [];
  is_loading = false;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private popupService: PopupService,
    private dateFormat: DateTimeFormatPipe
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
  }

  getTicketBox(type): void {
    if (this.maxTickets10 > this.popupService.dynamicContentCount) {
      const component = this.popupService.addDynamicContainer(this.ticketBoxs, TicketBoxComponent, { ticketType: type });
      this.popupService.dynamicContents.push(component.instance);
    }
  }

  parseDate(dates, hours, mins): Date {
    let date: Date;

    date = new Date(dates);
    date.setHours(hours);
    date.setMinutes(mins);

    return date;
  }

  setTicketTypes() {
    const ticketObjs = this.popupService.dynamicContents;
    let saveTickets: Array<any> = [];
    let canSave: boolean = true;

    for (let i = 0; i < ticketObjs.length; i++) {
      const fromDate = ticketObjs[i]['ticketForm'].get('mFromDate').value || ticketObjs[i]['ticketForm'].get('pcFromDate').value;
      const toDate = ticketObjs[i]['ticketForm'].get('mToDate').value || ticketObjs[i]['ticketForm'].get('pcToDate').value;
      const fromHours = ticketObjs[i]['ticketForm'].get('fromHours').value;
      const toHours = ticketObjs[i]['ticketForm'].get('toHours').value;
      const fromMins = ticketObjs[i]['ticketForm'].get('fromMins').value;
      const toMins = ticketObjs[i]['ticketForm'].get('toMins').value;
      const name = ticketObjs[i]['ticketForm'].get('ticketName').value;
      const desc = ticketObjs[i]['ticketForm'].get('ticketDesc').value;
      const price = ticketObjs[i]['parentData']['ticketType'] === 'free' ? 0 : ticketObjs[i]['ticketForm'].get('ticketPrice').value;
      const limit = ticketObjs[i]['ticketForm'].get('ticketCount').value;
      const spread = ticketObjs[i]['ticketForm'].get('ticketSpread').value;

      if (name && desc && price >= 0 && limit && fromDate && toDate && fromHours && toHours && fromMins && toMins) {
        canSave = true;

        saveTickets.push({
          name: name,
          desc: desc,
          sales_date: {
            start: this.dateFormat.transform(this.parseDate(fromDate, fromHours, fromMins).getTime(), 'apiDate'),
            end: this.dateFormat.transform(this.parseDate(toDate, toHours, toMins).getTime(), 'apiDate')
          },
          price: price,
          fpfg: {
            limit: limit,
            spread: spread
          },
          color: this.ticketService.ticketColors[i]
        });

      } else {
        this.is_loading = false;;
        canSave = false;
        break;
      }
    }
    if (canSave) {
      return saveTickets;
    } else {
      return [];
    }
  }

  done() {
    const ticketTypes = this.setTicketTypes();
    let paramObj: Object = { content_oid: this.contentId };
    this.is_loading = true;

    if (ticketTypes.length > 0) {
      paramObj['ticket_types'] = ticketTypes;

      this.ticketService.createTicketTypeV2(paramObj).subscribe(() => {
        this.is_loading = false;
        // manage ticket으로 이동
      }, err => {
        console.log(err);
        this.is_loading = false;
      });
    } else {
      this.is_loading = false;
      alert('필수정보를 모두 입력해주세요');
    }
  }
}
