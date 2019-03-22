import { Component, OnInit } from '@angular/core';
import { TicketService } from 'app/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  isCoverPopup: boolean = false;
  type: any;
  contentName: string;
  typeId: string;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.typeId = this.route.snapshot.paramMap.get('type_oid') || '';
    this.getInfoSequence();
  }

  getInfoSequence(): void {
    const callInfos = this.ticketService.getTypeInfoV2(this.typeId).switchMap(res => {
      this.type = res['data'];
      return this.contentService.getContent(this.type['content_oid']);
    }, (ticketData, contentData) => [ticketData, contentData]);


    callInfos.subscribe(res => {
      this.contentName = res[1]['data']['name'];
    });
  }

}
