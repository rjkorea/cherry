import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';
import { Select } from '@ngxs/store';
import { contentState } from 'app/states/content/content.state';
import { Observable } from 'rxjs';
import { HostInfo } from 'app/models/host-info.model';

@Component({
  selector: 'app-content-host-info',
  templateUrl: './content-host-info.component.html',
  styleUrls: ['./content-host-info.component.css']
})
export class ContentHostInfoComponent implements OnInit, OnDestroy {
  @Input() isCoverPopup: boolean;
  @Output() controlCoverPopup: EventEmitter<any> = new EventEmitter();

  hostForm = this.formBuilder.group({
    hostName: new FormControl('', [Validators.required]),
    hostEmail: new FormControl('', [Validators.required, Validators.email]),
    hostTel: new FormControl('', [Validators.required])
  });

  @Select(contentState.hostInfo)
  body$: Observable<HostInfo>;

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.body$.subscribe(res => {
      console.log(res);
    })
    document.scrollingElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // this.getHostInfoFromTemp();
  }

  ngOnDestroy() {
    localStorage.removeItem('temp');
  }

  getHostInfoFromTemp() {
    const previousHostInfo = JSON.parse(localStorage.getItem('temp')) || '';

    if (previousHostInfo) {
      this.body$ = previousHostInfo;
    }
  }

  done(): void {
    this.popupService.setNameSubject({ name: 'host', value: this.body$ });
    localStorage.setItem('temp', JSON.stringify(this.body$));

    if (this.isCoverPopup) {
      this.controlCoverPopup.emit(false);
    } else {
      this.popupService.clearPopup();
    }
  }

  get hostName() { return this.hostForm.get('hostName'); }
  get hostEmail() { return this.hostForm.get('hostEmail'); }
  get hostTel() { return this.hostForm.get('hostTel'); }
}
