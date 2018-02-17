import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSetupDetailComponent } from './tax-setup-detail.component';

describe('TaxSetupDetailComponent', () => {
  let component: TaxSetupDetailComponent;
  let fixture: ComponentFixture<TaxSetupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxSetupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSetupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
