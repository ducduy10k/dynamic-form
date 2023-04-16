import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  Injector,
  Compiler,
  OnInit,
} from '@angular/core';
import { TestComponent } from './components/test/test.component';
import { LazyLoaderService } from './services/lazy-loader.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicConfig } from './forms/fields/dynamic-config';
import { DynamicComponentService } from './services/dynamic-component.service';
import { FieldType } from './forms/fields/field-type';

@Component({
  selector: 'app-dynamic-form-one',
  templateUrl: './dynamic-form-one.component.html',
  styleUrls: ['./dynamic-form-one.component.scss'],
})
export class DynamicFormOneComponent implements OnInit {
  @ViewChild('dnForm', { read: ViewContainerRef, static: true })
  dnForm!: ViewContainerRef;
  @ViewChild('dnDemoForm', { read: ViewContainerRef, static: true })
  dnDemoForm!: ViewContainerRef;
  moduleLoaded: boolean = false;
  demoForm: FormGroup;
  demoForm2: FormGroup;
  fieldType = FieldType;
  dynamicFormConfig: DynamicConfig[] = [
    {
      fieldType: FieldType.Input,
      key: 'name',
      prop: {
        placeholder: 'Name',
      },
    },
    {
      fieldType: FieldType.Input,
      key: 'email',
      prop: {
        placeholder: 'Email',
      },
    },
  ];
  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private lazyloadService: LazyLoaderService,
    private router: Router,
    private dynamicComponentService: DynamicComponentService
  ) {
    this.demoForm = new FormGroup({});
    this.demoForm2 = new FormGroup({});
  }

  ngOnInit(): void {
    for (let fieldConfig of this.dynamicFormConfig) {
      const fc = new FormControl();
      this.demoForm.addControl(fieldConfig.key, fc);
      this.demoForm2.addControl(fieldConfig.key, fc);
      this.dynamicComponentService.addDynamicComponent(
        this.dnDemoForm,
        fieldConfig,
        fc
      );
    }
    console.log(this.demoForm);
    this.demoForm.valueChanges.subscribe((data) => {
      console.log('data: ', data);
    });
    this.demoForm2.valueChanges.subscribe((data) => {
      console.log('data: ', data);
    });
  }

  addDynamicComponent() {
    console.log('cfr: ', this.cfr);
    const cmpFactory = this.cfr.resolveComponentFactory(TestComponent);
    const componentRef = cmpFactory.create(this.injector);
    this.dnForm.insert(componentRef.hostView);

    // How to pass inputs?
    componentRef.instance.title = 'test';
    setTimeout(() => {
      componentRef.instance.title = 'new test';
    }, 1000);
    // How to bind to outputs
    componentRef.instance.onClick.subscribe((title) => {
      console.log('title: ', title);
    });
    componentRef.instance.onChange.subscribe((data) => {
      console.log('data: ', data);
    });
  }

  clear() {
    this.dnForm.clear();
  }

  onLoad() {
    this.lazyloadService.loadModule(
      () => import('./modules/test/test.module').then((m) => m.TestModule),
      (md) => {
        this.moduleLoaded = true;
      }
    );
  }

  gotoLazyRoute() {
    this.router.navigate(['test']).then((result) => {
      console.log('it worked!!!');
    });
  }
}
