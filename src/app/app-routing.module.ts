import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dynamic-one',
    loadChildren: () =>
      import('./dynamic-form-one/dynamic-form-one.module').then(
        (m) => m.DynamicFormOneModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
