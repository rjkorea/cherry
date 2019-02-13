import { Injectable, Inject, ComponentFactoryResolver } from '@angular/core';
import { ToggleComponent } from 'app/components/common/popup/toggle/toggle.component';

@Injectable()
export class ToggleService {
    factory;
    content;
  
    constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {
      this.factory = factoryResolver;
    }
  
    setView(view) {
      this.content = view;
    }
  
    add(component) {
      const factory = this.factory.resolveComponentFactory(ToggleComponent);
      const popup = factory.create(this.content.parentInjector);
  
      popup.instance.container = component;
      this.content.insert(popup.hostView);
    }
  
    clearToggle = (): void => {
      this.content.clear();
    }
}
