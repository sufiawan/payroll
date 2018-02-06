import { TestBed, inject } from '@angular/core/testing';

import { JobPositionService } from './job-position.service';

describe('JobPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobPositionService]
    });
  });

  it('should be created', inject([JobPositionService], (service: JobPositionService) => {
    expect(service).toBeTruthy();
  }));
});
