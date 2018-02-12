import { TestBed, inject } from '@angular/core/testing';

import { TimeOffPolicyService } from './time-off-policy.service';

describe('TimeOffPolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeOffPolicyService]
    });
  });

  it('should be created', inject([TimeOffPolicyService], (service: TimeOffPolicyService) => {
    expect(service).toBeTruthy();
  }));
});
