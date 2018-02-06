import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPositionListComponent } from './job-position-list.component';

describe('JobPositionListComponent', () => {
  let component: JobPositionListComponent;
  let fixture: ComponentFixture<JobPositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
