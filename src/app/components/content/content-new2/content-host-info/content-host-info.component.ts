import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';

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

  body = {
    hostName: '',
    hostEmail: '',
    hostTel: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    const previousData = JSON.parse(localStorage.getItem('temp')) || '';

    if (previousData) {
      this.body = previousData;
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('temp');
  }

  done(): void {
    this.popupService.setNameSubject({ name: 'host', value: this.body });
    localStorage.setItem('temp', JSON.stringify(this.body));

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
