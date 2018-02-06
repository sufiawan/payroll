import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtDetailComponent } from './rt-detail.component';

describe('RtDetailComponent', () => {
  let component: RtDetailComponent;
  let fixture: ComponentFixture<RtDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
