import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwsComponent } from './rws.component';

describe('RwsComponent', () => {
  let component: RwsComponent;
  let fixture: ComponentFixture<RwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
