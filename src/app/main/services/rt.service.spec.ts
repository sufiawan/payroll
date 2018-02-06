import { TestBed, inject } from '@angular/core/testing';

import { RtService } from './rt.service';

describe('RtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtService]
    });
  });

  it('should be created', inject([RtService], (service: RtService) => {
    expect(service).toBeTruthy();
  }));
});
