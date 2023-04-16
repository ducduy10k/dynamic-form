import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormOneComponent } from './dynamic-form-one.component';
import { RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LazyLoaderService } from './services/lazy-loader.service';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [DynamicFormOneComponent, InputTextComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DynamicFormOneComponent }]),
  ],
  providers: [LazyLoaderService],
  entryComponents: [InputTextComponent],
})
export class DynamicFormOneModule {}
