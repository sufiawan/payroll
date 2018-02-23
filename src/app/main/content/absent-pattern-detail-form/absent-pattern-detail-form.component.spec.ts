import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentPatternDetailFormComponent } from './absent-pattern-detail-form.component';

describe('AbsentPatternDetailFormComponent', () => {
  let component: AbsentPatternDetailFormComponent;
  let fixture: ComponentFixture<AbsentPatternDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentPatternDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentPatternDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
