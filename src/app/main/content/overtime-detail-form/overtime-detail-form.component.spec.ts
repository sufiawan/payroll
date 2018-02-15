import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeDetailFormComponent } from './overtime-detail-form.component';

describe('OvertimeDetailFormComponent', () => {
  let component: OvertimeDetailFormComponent;
  let fixture: ComponentFixture<OvertimeDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
