import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private placeService: PlaceService,
              private router: Router) { }

  ngOnInit() {
    this.place = {
      name: '',
      mobile_number: '',
      area: '',
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
          console.log(error);
        }
      );
  }

  disabledSubmit() {
    return !(this.place.name && this.place.mobile_number && this.place.area && this.place.number);
  }

}
