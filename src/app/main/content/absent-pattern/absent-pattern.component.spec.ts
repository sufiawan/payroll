import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentPatternComponent } from './absent-pattern.component';

describe('AbsentPatternComponent', () => {
  let component: AbsentPatternComponent;
  let fixture: ComponentFixture<AbsentPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
