import { Injectable, Inject, ComponentFactoryResolver, EmbeddedViewRef, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PopupService {
  public subject = new Subject<any>();
  public nameSubject = new Subject<any>();
  public data: any;
  public dynamicContentCount: number = 0;
  private factory: any;
  private content: any;

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {
    this.factory = factoryResolver;
    this.subject.asObservable();
  }

  setView(view): void {
    this.content = view;
  }

  setSubject(sub): void {
    this.subject.next(sub);
  }

  setNameSubject(nSub): void {
    this.nameSubject.next(nSub);
  }

  setData(data): void {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  add(container, component): void {
    const factory = this.factory.resolveComponentFactory(container);
    const view = factory.create(this.content.parentInjector);

    view.instance.popup = component;
    view.instance.clear = this.clearPopup;

    this.content.insert(view.hostView) as EmbeddedViewRef<any>;
  }

  addDynamicContainer(container: ViewContainerRef, component: any): void {
    this.dynamicContentCount++;

    const factory = this.factory.resolveComponentFactory(component);
    const view = container.createComponent(factory);

    view.instance['box'] = view;
  }

  clearPopup = (): void => {
    this.content.clear();
  }

  clearSubject(): void {
    this.subject.unsubscribe();
    this.subject = new Subject<any>();
  }

  clearNameSubject(): void {
    this.nameSubject.unsubscribe();
    this.nameSubject = new Subject<any>();
  }
}
