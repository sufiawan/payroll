import { TestBed, inject } from '@angular/core/testing';

import { RwService } from './rw.service';

describe('RwService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RwService]
    });
  });

  it('should be created', inject([RwService], (service: RwService) => {
    expect(service).toBeTruthy();
  }));
});
