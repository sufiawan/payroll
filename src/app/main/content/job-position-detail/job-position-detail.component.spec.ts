import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPositionDetailComponent } from './job-position-detail.component';

describe('JobPositionDetailComponent', () => {
  let component: JobPositionDetailComponent;
  let fixture: ComponentFixture<JobPositionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPositionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
