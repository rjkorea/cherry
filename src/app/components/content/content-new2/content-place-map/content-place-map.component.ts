import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlaceService } from 'app/services/place.service';
import { PopupService } from 'app/services/popup.service';

@Component({
  selector: 'app-content-place-map',
  templateUrl: './content-place-map.component.html',
  styleUrls: ['./content-place-map.component.css']
})
export class ContentPlaceMapComponent implements OnInit {
  @Input() isCoverPopup: boolean;
  @Output() controlCoverPopup: EventEmitter<any> = new EventEmitter();

  placeList = [];
  searchForm = this.formBuilder.group({
    keyword: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
  }

  searchPlace(): void {
    const keyword = this.searchForm.get('keyword').value;

    this.placeService.getLocalSearchKeyword(keyword).subscribe(res => {
      this.placeList = res['documents'];
    })
  }

  setPlaceMap(place): void {
    this.popupService.setNameSubject({ name: 'map', value: place });

    if (this.isCoverPopup) {
      this.controlCoverPopup.emit(false);
    } else {
      this.popupService.clearPopup();
    }
  }

  get keyword() {
    return this.searchForm.get('keyword');
  }
}
