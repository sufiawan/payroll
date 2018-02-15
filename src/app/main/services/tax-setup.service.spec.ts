import { TestBed, inject } from '@angular/core/testing';

import { TaxSetupService } from './tax-setup.service';

describe('TaxSetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxSetupService]
    });
  });

  it('should be created', inject([TaxSetupService], (service: TaxSetupService) => {
    expect(service).toBeTruthy();
  }));
});
