import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLevelDetailComponent } from './job-level-detail.component';

describe('JobLevelDetailComponent', () => {
  let component: JobLevelDetailComponent;
  let fixture: ComponentFixture<JobLevelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobLevelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLevelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
