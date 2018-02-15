import { TestBed, inject } from '@angular/core/testing';

import { TimeOffSchemeService } from './time-off-scheme.service';

describe('TimeOffSchemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeOffSchemeService]
    });
  });

  it('should be created', inject([TimeOffSchemeService], (service: TimeOffSchemeService) => {
    expect(service).toBeTruthy();
  }));
});
