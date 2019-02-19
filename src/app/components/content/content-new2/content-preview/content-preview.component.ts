import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css']
})
export class ContentPreviewComponent implements OnInit {
  @Input() previewData: any;
  @Input() isCoverPopup: boolean;
  @Output() controlCoverPopup: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    document.scrollingElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

}
