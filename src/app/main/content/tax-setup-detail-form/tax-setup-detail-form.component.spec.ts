import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSetupDetailFormComponent } from './tax-setup-detail-form.component';

describe('TaxSetupDetailFormComponent', () => {
  let component: TaxSetupDetailFormComponent;
  let fixture: ComponentFixture<TaxSetupDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSetupDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSetupDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
