import { TestBed, inject } from '@angular/core/testing';

import { JobLevelService } from './job-level.service';

describe('JobLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobLevelService]
    });
  });

  it('should be created', inject([JobLevelService], (service: JobLevelService) => {
    expect(service).toBeTruthy();
  }));
});
