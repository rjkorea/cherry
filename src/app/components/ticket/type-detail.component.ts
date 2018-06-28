import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.css'],
  providers: []
})
export class TicketTypeDetailComponent implements OnInit {
  type: any;
  type_form: any;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private ticketService: TicketService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadType(params['id']);
    this.edit_mode = false;
  }

  loadType(id: string) {
    this.ticketService.getType(id)
      .subscribe(
        response => {
          this.type = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.type_form = {
      name: this.type.name,
      desc: {
        enabled: this.type.desc.enabled,
        value: this.type.desc.value
      },
      price: this.type.price,
      enabled: this.type.enabled
    };
    this.ticketService.updateType(this.type._id, this.type_form)
      .subscribe(
        response => {
          this.loadType(this.type._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onCancel() {
    this.loadType(this.type._id);
    this.edit_mode = false;
  }

}
