import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopupService } from 'app/services/popup.service';

@Component({
  selector: 'app-content-host-info',
  templateUrl: './content-host-info.component.html',
  styleUrls: ['./content-host-info.component.css']
})
export class ContentHostInfoComponent implements OnInit {
  @Input() isCoverPopup: boolean;
  @Output() controlCoverPopup: EventEmitter<any> = new EventEmitter();

  hostForm = this.formBuilder.group({
    hostName: new FormControl('', [Validators.required]),
    hostEmail: new FormControl('', [Validators.required, Validators.email]),
    hostTel: new FormControl('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService
  ) { }

  ngOnInit() {
  }

  done(): void {
    const body = {
      hostName: this.hostForm.get('hostName').value,
      hostEmail: this.hostForm.get('hostEmail').value,
      hostTel: this.hostForm.get('hostTel').value
    };
  
    this.popupService.setNameSubject({ name: 'host', value: body });

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
