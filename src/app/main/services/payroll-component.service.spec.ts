import { TestBed, inject } from '@angular/core/testing';

import { PayrollComponentService } from './payroll-component.service';

describe('PayrollComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollComponentService]
    });
  });

  it('should be created', inject([PayrollComponentService], (service: PayrollComponentService) => {
    expect(service).toBeTruthy();
  }));
});
