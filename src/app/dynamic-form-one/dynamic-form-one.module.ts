import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormOneComponent } from './dynamic-form-one.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LazyLoaderService } from './services/lazy-loader.service';

@NgModule({
  declarations: [DynamicFormOneComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DynamicFormOneComponent }]),
  ],
  providers: [LazyLoaderService],
})
export class DynamicFormOneModule {}
