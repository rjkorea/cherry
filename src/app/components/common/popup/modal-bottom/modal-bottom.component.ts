import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-modal-bottom',
  templateUrl: './modal-bottom.component.html',
  styleUrls: ['./modal-bottom.component.css']
})
export class ModalBottomComponent implements OnInit {
  @ViewChild('popup', { read: ViewContainerRef }) child: ViewContainerRef;

  popup: any;
  inner: any;
  clear: Function;

  constructor(
    private factory: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.inner = this.factory.resolveComponentFactory(this.popup);
    this.child.createComponent(this.inner);
  }
}
