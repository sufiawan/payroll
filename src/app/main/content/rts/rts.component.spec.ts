import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtsComponent } from './rts.component';

describe('RtsComponent', () => {
  let component: RtsComponent;
  let fixture: ComponentFixture<RtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
