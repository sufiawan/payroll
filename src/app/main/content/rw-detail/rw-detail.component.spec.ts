import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwDetailComponent } from './rw-detail.component';

describe('RwDetailComponent', () => {
  let component: RwDetailComponent;
  let fixture: ComponentFixture<RwDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
