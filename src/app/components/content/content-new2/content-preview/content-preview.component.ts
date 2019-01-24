import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css']
})
export class ContentPreviewComponent implements OnInit {
  @Input() previewData: any;

  constructor() { }

  ngOnInit() {
  }

}
