import { TestBed, inject } from '@angular/core/testing';

import { UiServiceService } from './ui-service.service';

describe('UiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiServiceService]
    });
  });

  it('should be created', inject([UiServiceService], (service: UiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
