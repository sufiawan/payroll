import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentDetailFormComponent } from './payroll-component-detail-form.component';

describe('PayrollComponentDetailFormComponent', () => {
  let component: PayrollComponentDetailFormComponent;
  let fixture: ComponentFixture<PayrollComponentDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
