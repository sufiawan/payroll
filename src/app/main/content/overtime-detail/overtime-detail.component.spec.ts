import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeDetailComponent } from './overtime-detail.component';

describe('OvertimeDetailComponent', () => {
  let component: OvertimeDetailComponent;
  let fixture: ComponentFixture<OvertimeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
