import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { PopupService } from '../../../../services/popup.service';

@Component({
  selector: 'app-content-cropper',
  templateUrl: './content-cropper.component.html',
  styleUrls: ['./content-cropper.component.css']
})
export class ContentCropperComponent implements OnInit {
  @Input() isCoverPopup: boolean;
  @Output() controlCoverPopup: EventEmitter<any> = new EventEmitter();

  imageChangedEvent: any;

  constructor(
    private PopupService: PopupService
  ) { }

  ngOnInit() {
    this.imageChangedEvent = this.PopupService.getData();
  }

  emitCrop(cropper: ImageCropperComponent): void {
    cropper.crop('both');
  }

  imageCropped(e: ImageCroppedEvent): void {
    this.PopupService.setEndSubject(e.base64);

    if (this.isCoverPopup) {
      this.controlCoverPopup.emit(false);
    } else {
      this.PopupService.clearPopup();
    }
  }

  imageLoaded(): void {
    // 이미지가 로드되기 직전
  }

  loadImageFailed(): void {
    alert('이미지는 JPEG, PNG, JPG 형식만 가능합니다');

    if (this.isCoverPopup) {
      this.controlCoverPopup.emit(false);
    } else {
      this.PopupService.clearPopup();
    }
  }
}
