import { TestBed, inject } from '@angular/core/testing';

import { PopcornService } from './popcorn.service';

describe('PopcornService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopcornService]
    });
  });

  it('should be created', inject([PopcornService], (service: PopcornService) => {
    expect(service).toBeTruthy();
  }));
});
