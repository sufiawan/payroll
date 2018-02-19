import { TestBed, inject } from '@angular/core/testing';

import { AbsentPatternService } from './absent-pattern.service';

describe('AbsentPatternService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsentPatternService]
    });
  });

  it('should be created', inject([AbsentPatternService], (service: AbsentPatternService) => {
    expect(service).toBeTruthy();
  }));
});
