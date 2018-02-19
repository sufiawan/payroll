import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentPatternDetailComponent } from './absent-pattern-detail.component';

describe('AbsentPatternDetailComponent', () => {
  let component: AbsentPatternDetailComponent;
  let fixture: ComponentFixture<AbsentPatternDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentPatternDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentPatternDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
