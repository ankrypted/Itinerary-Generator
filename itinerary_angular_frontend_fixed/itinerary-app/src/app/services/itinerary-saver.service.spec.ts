import { TestBed } from '@angular/core/testing';

import { ItinerarySaverService } from './itinerary-saver.service';

describe('ItinerarySaverService', () => {
  let service: ItinerarySaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItinerarySaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
