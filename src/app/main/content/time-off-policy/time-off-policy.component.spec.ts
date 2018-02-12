import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffPolicyComponent } from './time-off-policy.component';

describe('TimeOffPolicyComponent', () => {
  let component: TimeOffPolicyComponent;
  let fixture: ComponentFixture<TimeOffPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
