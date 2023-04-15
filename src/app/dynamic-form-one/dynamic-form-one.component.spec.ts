import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormOneComponent } from './dynamic-form-one.component';

describe('DynamicFormOneComponent', () => {
  let component: DynamicFormOneComponent;
  let fixture: ComponentFixture<DynamicFormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
