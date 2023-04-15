import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  Injector,
  Compiler,
} from '@angular/core';
import { TestComponent } from './components/test/test.component';
import { LazyLoaderService } from './services/lazy-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form-one',
  templateUrl: './dynamic-form-one.component.html',
  styleUrls: ['./dynamic-form-one.component.scss'],
})
export class DynamicFormOneComponent {
  @ViewChild('dnForm', { read: ViewContainerRef }) dnForm: any;
  moduleLoaded: boolean = false;
  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private lazyloadService: LazyLoaderService,
    private router: Router
  ) {}

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
