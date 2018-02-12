import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffPolicyDetailComponent } from './time-off-policy-detail.component';

describe('TimeOffPolicyDetailComponent', () => {
  let component: TimeOffPolicyDetailComponent;
  let fixture: ComponentFixture<TimeOffPolicyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffPolicyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
