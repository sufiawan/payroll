import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrateDetailComponent } from './prorate-detail.component';

describe('ProrateDetailComponent', () => {
  let component: ProrateDetailComponent;
  let fixture: ComponentFixture<ProrateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProrateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProrateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
