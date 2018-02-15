import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffSchemeDetailComponent } from './time-off-scheme-detail.component';

describe('TimeOffSchemeDetailComponent', () => {
  let component: TimeOffSchemeDetailComponent;
  let fixture: ComponentFixture<TimeOffSchemeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOffSchemeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffSchemeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
