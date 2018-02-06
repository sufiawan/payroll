import { TestBed, inject } from '@angular/core/testing';

import { LogErrorHandleService } from './log-error-handle.service';

describe('LogErrorHandleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogErrorHandleService]
    });
  });

  it('should be created', inject([LogErrorHandleService], (service: LogErrorHandleService) => {
    expect(service).toBeTruthy();
  }));
});
