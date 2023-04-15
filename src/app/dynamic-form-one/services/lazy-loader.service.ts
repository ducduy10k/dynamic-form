import {
  Compiler,
  Injectable,
  Injector,
  NgModuleFactory,
  Type,
} from '@angular/core';
import { of, Observable, delay, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LazyLoaderService {
  constructor(private compiler: Compiler, private injector: Injector) {}

  loadModule(path: any, callBack?: (res: any) => void) {
    const lazyModuleInjector = Injector.create({
      providers: [],
      parent: this.injector,
      name: 'testModule',
    });
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then((elementModuleOrFactory) => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then((moduleFactory) => {
        try {
          const elementModuleRef = moduleFactory.create(lazyModuleInjector);
          const moduleInstance = elementModuleRef.instance;
          console.log(moduleInstance, moduleFactory);
          if (callBack) callBack(moduleInstance);
          // do something with the module...
        } catch (err) {
          throw err;
        }
      });
  }
}
