import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { DynamicConfig } from '../forms/fields/dynamic-config';
import { InputTextComponent } from '../components/input-text/input-text.component';
import { FormControl } from '@angular/forms';
import { FieldType } from '../forms/fields/field-type';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  addDynamicComponent(
    viewRef: ViewContainerRef,
    fieldConfig: DynamicConfig,
    formControl: FormControl
  ) {
    const cmpFactory = this.cfr.resolveComponentFactory(
      this.getComponentFactory(fieldConfig.fieldType)
    );
    const componentRef = cmpFactory.create(this.injector);
    componentRef.instance.formControl = formControl;
    viewRef.insert(componentRef.hostView);
    Object.keys(fieldConfig.prop).forEach((key) => {
      (componentRef.instance as any)[key] = fieldConfig.prop[key];
    });
  }

  clear(viewRef: ViewContainerRef) {
    viewRef.clear();
  }

  getComponentFactory(fieldType: FieldType) {
    switch (fieldType) {
      default: {
        return InputTextComponent;
      }
    }
  }
}
