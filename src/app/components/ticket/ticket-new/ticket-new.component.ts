import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class TicketNewComponent implements OnInit, OnDestroy {
  @ViewChild('ticketBoxs', { read: ViewContainerRef }) ticketBoxs: ViewContainerRef;

  contentId: string;
  contentName: string;
  maxTickets: number = 200;
  isCoverPopup: boolean = false;
  typeCoverPopup: string = '';
  saveTickets = [];
  previousTicketCnt = 0;

  is_loading = false;
  previewData = [];

  constructor(
    public popupService: PopupService,
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private ticketService: TicketService,
    private dateFormat: DateTimeFormatPipe
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('content_oid') || '';
    this.contentService.getThisContentV2(this.contentId).subscribe(res => {
      this.contentName = res['data']['name'];
    });

    this.previousTicketCnt = this.route.snapshot.params['previous'] || 0;
    this.popupService.dynamicContentCount = this.previousTicketCnt;
  }
  ngOnDestroy() {
    localStorage.removeItem('temp_from_date');
    this.popupService.dynamicBoxCount = 0;
    this.popupService.dynamicContentCount = 0;
    this.popupService.dynamicContents = [];
  }

  getTicketBox(type): void {
    if (this.maxTickets > this.popupService.dynamicContentCount) {
      const component = this.popupService.addDynamicContainer(this.ticketBoxs, TicketBoxComponent, { ticketType: type });
      this.popupService.dynamicContents.push(component.instance);
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }

  setPreview(type): void {
    const ticketObjs = this.popupService.dynamicContents.filter((obj) => { return obj !== null });

    // 생성된 티켓 갯수에서 컬러개수를 빼 생성될 컬러 인덱스를 구함
    let colorCount = (this.previousTicketCnt >= 5 ? this.previousTicketCnt - 5 : this.previousTicketCnt);
    let overColorCount = 0;

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
        color: this.ticketService.ticketColors[colorCount < 5 ? colorCount++ : overColorCount++]
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
    const ticketObjs = this.popupService.dynamicContents.filter((obj) => { return obj !== null });
    let saveTickets: Array<any> = [];
    let canSave: boolean = true;
    let colorCount = this.previousTicketCnt;
    let overColorCount = 0;

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

      if (name && desc && price >= 0 && limit > 0 && fromDate && toDate && fromHours && toHours && fromMins && toMins) {
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
            spread: Number.parseInt(spread),
            now: 0
          },
          color: this.ticketService.ticketColors[colorCount < 5 ? colorCount++ : overColorCount++]
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
    const paramObj: Object = { content_oid: this.contentId };
    this.is_loading = true;

    if (ticketTypes.length > 0) {
      paramObj['ticket_types'] = ticketTypes;

      this.ticketService.createTicketTypeV2(paramObj).subscribe(() => {
        localStorage.removeItem('temp_from_date');
        this.is_loading = false;
        this.popupService.dynamicBoxCount = 0;
        this.popupService.dynamicContentCount = 0;
        this.popupService.dynamicContents = [];
        this.router.navigate([`ticket/type/${this.contentId}`]);
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
