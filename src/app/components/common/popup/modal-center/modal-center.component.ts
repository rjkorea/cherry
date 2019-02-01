import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';


@Component({
  selector: 'app-modal-center',
  templateUrl: './modal-center.component.html',
  styleUrls: ['./modal-center.component.css']
})
export class ModalCenterComponent implements OnInit {
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
