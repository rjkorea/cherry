import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/services/ticket.service';
import { PopupService } from 'app/services/popup.service';
import { TicketBoxComponent } from '../ticket-box/ticket-box.component';
import { DateTimeFormatPipe } from 'app/pipes/datetime.pipe';
import { ContentService } from 'app/services/content.service';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {
  @ViewChild('ticketBoxs', { read: ViewContainerRef }) ticketBoxs: ViewContainerRef;

  contentId: string;
  contentName: string;
  maxTickets10: number = 10;
  isCoverPopup: boolean = false;
  typeCoverPopup: string = '';
  saveTickets = [];

  is_loading = false;
  previewData = [];

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private ticketService: TicketService,
    private popupService: PopupService,
    private dateFormat: DateTimeFormatPipe
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
    this.contentService.getThisContentV2(this.contentId).subscribe(res => {
      this.contentName = res['data']['name'];
    })
  }

  getTicketBox(type): void {
    if (this.maxTickets10 > this.popupService.dynamicContentCount) {
      const component = this.popupService.addDynamicContainer(this.ticketBoxs, TicketBoxComponent, { ticketType: type });
      this.popupService.dynamicContents.push(component.instance);
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }

  setPreview(type): void {
    const ticketObjs = this.popupService.dynamicContents;
    let colorCount = 0;

    this.previewData = [];

    for (let i = 0; i < ticketObjs.length; i++) {
      const fromDate = ticketObjs[i]['ticketForm'].get('mFromDate').value || ticketObjs[i]['ticketForm'].get('pcFromDate').value;
      const toDate = ticketObjs[i]['ticketForm'].get('mToDate').value || ticketObjs[i]['ticketForm'].get('pcToDate').value;
      const fromHours = ticketObjs[i]['ticketForm'].get('fromHours').value;
      const toHours = ticketObjs[i]['ticketForm'].get('toHours').value;
      const fromMins = ticketObjs[i]['ticketForm'].get('fromMins').value;
      const toMins = ticketObjs[i]['ticketForm'].get('toMins').value;
      const price = ticketObjs[i]['parentData']['ticketType'] === 'free' ? 0 : ticketObjs[i]['ticketForm'].get('ticketPrice').value;

      this.previewData[i] = {
        contentName: this.contentName,
        name: ticketObjs[i]['ticketForm'].get('ticketName').value,
        desc: ticketObjs[i]['ticketForm'].get('ticketDesc').value,
        sales_date: {
          start: this.dateFormat.transform(this.parseDate(fromDate, fromHours, fromMins).getTime(), 'datetime'),
          end: this.dateFormat.transform(this.parseDate(toDate, toHours, toMins).getTime(), 'datetime')
        },
        price: Number.parseInt(price),
        color: this.ticketService.ticketColors[i < 5 ? i : colorCount++]
      };
    }

    if (type === 'm') {
      this.controlCoverPopup(true, 'preview');
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
          price: Number.parseInt(price),
          fpfg: {
            limit: Number.parseInt(limit),
            spread: Number.parseInt(spread)
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

        if (err['error']['code'] === 1) {
          alert('스프레드는 티켓수량보다 많아야 합니다.');
        } else if (err['errpr']['code'] === 3) {
          alert('해당 컨텐츠가 만들 수 있는 티켓 수량(10개)을 초과했습니다.')
        }
      });
    } else {
      this.is_loading = false;
      alert('필수정보를 모두 입력해주세요');
    }
  }
}
