import { Injectable, Inject, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  public subject = new Subject<any>();
  public data: any;
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
    view.instance.clear = this.clearModal;

    this.content.insert(view.hostView) as EmbeddedViewRef<any>;
  }

  clearModal = (): void => {
    this.content.clear();
  }
}
