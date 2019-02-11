import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalService } from 'app/services/modal.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-content-cropper',
  templateUrl: './content-cropper.component.html',
  styleUrls: ['./content-cropper.component.css']
})
export class ContentCropperComponent implements OnInit {
  imageChangedEvent: any;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.imageChangedEvent = this.modalService.getData();
  }

  emitCrop(cropper: ImageCropperComponent): void {
    cropper.crop('both');
  }

  imageCropped(e: ImageCroppedEvent): void {
    this.modalService.clearModalAndSet(e.base64);

  }

  imageLoaded(): void {
    // 이미지가 로드되기 직전
  }

  loadImageFailed(): void {
    alert('이미지는 JPEG, PNG, JPG 형식만 가능합니다');
    this.modalService.clearModal();
  }
}
