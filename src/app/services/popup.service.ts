import {ComponentFactoryResolver, EmbeddedViewRef, Inject, Injectable, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class PopupService {
  public subject = new Subject<any>();
  public nameSubject = new Subject<any>();
  public data: any;
  public dynamicBoxCount = 0;
  public dynamicContentCount = 0;
  public dynamicContents = [];
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

  // getDynamicContentCount() {
  //   return this.dynamicContentCount;
  // }

  add(container, component): void {
    const factory = this.factory.resolveComponentFactory(container);
    const view = factory.create(this.content.parentInjector);

    view.instance.popup = component;
    view.instance.clear = this.clearPopup;

    this.content.insert(view.hostView) as EmbeddedViewRef<any>;
  }

  addDynamicContainer(container: ViewContainerRef, component: any, data: Object) {
    this.dynamicContentCount++;

    const factory = this.factory.resolveComponentFactory(component);
    const view = container.createComponent(factory);

    view.instance['box'] = view;
    view.instance['boxIndex'] = this.dynamicBoxCount++;
    view.instance['parentData'] = data;

    return view;
  }


  clearPopup = (): void => {
    this.content.clear();
  };

  clearSubject(): void {
    this.subject.unsubscribe();
    this.subject = new Subject<any>();
  }

  clearNameSubject(): void {
    this.nameSubject.unsubscribe();
    this.nameSubject = new Subject<any>();
  }
}
