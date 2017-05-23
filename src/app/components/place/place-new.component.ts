import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-place-new',
  templateUrl: './place-new.component.html',
  styleUrls: ['./place-new.component.css'],
  providers: []
})
export class PlaceNewComponent implements OnInit {
  place: any;
  area: string;
  error: boolean;
  areas: string[];

  constructor(private placeService: PlaceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('area'in params) {
      this.area = params['area'];
    }
    this.areas = [' ', 'A', 'B', 'C'];
    this.error = false;
    this.place = {
      name: '',
      mobile_number: '',
      area: this.area,
      number: ''
    }
  }

  onSubmit() {
    this.placeService.addPlace(this.place)
      .subscribe(
        response => {
          this.router.navigate(['/place']);
        },
        error => {
          this.error = true;
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.place.name && this.place.mobile_number && this.place.area && this.place.number);
  }

}
