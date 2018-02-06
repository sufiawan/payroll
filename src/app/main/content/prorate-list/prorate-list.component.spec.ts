import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrateListComponent } from './prorate-list.component';

describe('ProrateListComponent', () => {
  let component: ProrateListComponent;
  let fixture: ComponentFixture<ProrateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProrateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProrateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
