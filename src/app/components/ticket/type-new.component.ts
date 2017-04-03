import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { ContentService } from '../../services/content.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-ticket-type-new',
  templateUrl: './type-new.component.html',
  styleUrls: ['./type-new.component.css'],
  providers: [NotificationsService]
})
export class TicketTypeNewComponent implements OnInit {
  private type: any;
  private notification_options: Object;
  private contents: Array<any> = [];


  constructor(private ticketService: TicketService,
              private contentService: ContentService,
              private router: Router,
              private simpleNotificationsService: NotificationsService) { }

  ngOnInit() {
    this.type = {
      name: '',
      desc: '',
      day: 1,
      price: 0,
      content_oid: '',
      user_oid: ''
    }
    this.loadContents()
    this.notification_options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
  }

  onSubmit() {
    this.type.user_oid = localStorage.getItem('_id');
    this.ticketService.addType(this.type)
      .subscribe(
        response => {
          this.router.navigate(['/ticket/type']);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          for (let c of response['data']) {
            this.contents.push({id: c['_id'], text: c['name']})
          }
          console.log(this.contents);
        },
        error => {
          this.simpleNotificationsService.error(
            'Error',
            error['message'],
            this.notification_options
          );
          console.log(error);
        }
      );
  }

  public disabledSubmit() {
    return !(this.type.content_oid && this.type.name && this.type.desc && this.type.price && this.type.day);
  }

}
