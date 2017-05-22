import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  providers: []
})
export class PlaceDetailComponent implements OnInit {
  place: any;
  place_form: any;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private placeService: PlaceService) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    this.loadPlace(params['id']);
    this.edit_mode = false;
  }

  loadPlace(id: string) {
    this.placeService.getPlace(id)
      .subscribe(
        response => {
          this.place = response['data'];
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
    this.place_form = {
      name: this.place.name,
      mobile_number: this.place.mobile_number,
      area: this.place.area,
      number: this.place.number,
      enabled: this.place.enabled,
    }
    this.placeService.updatePlace(this.place._id, this.place_form)
      .subscribe(
        response => {
          this.loadPlace(this.place._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onCancel() {
    this.loadPlace(this.place._id);
    this.edit_mode = false;
  }

}
