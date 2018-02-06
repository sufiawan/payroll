import { TestBed, inject } from '@angular/core/testing';

import { ProrateService } from './prorate.service';

describe('ProrateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProrateService]
    });
  });

  it('should be created', inject([ProrateService], (service: ProrateService) => {
    expect(service).toBeTruthy();
  }));
});
