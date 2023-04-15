import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from '../../components/test/test.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'test',
        component: TestComponent,
      },
    ]),
  ],
  exports: [TestComponent],
})
export class TestModule {
  constructor(private router: Router) {
    //workaround: manually add the path to the router config
    router.config.push({
      path: 'test',
      component: TestComponent,
    });
  }
}
