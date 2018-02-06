import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentDetailComponent } from './payroll-component-detail.component';

describe('PayrollComponentDetailComponent', () => {
  let component: PayrollComponentDetailComponent;
  let fixture: ComponentFixture<PayrollComponentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
