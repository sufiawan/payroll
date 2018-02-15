import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffSchemeComponent } from './time-off-scheme.component';

describe('TimeOffSchemeComponent', () => {
  let component: TimeOffSchemeComponent;
  let fixture: ComponentFixture<TimeOffSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
