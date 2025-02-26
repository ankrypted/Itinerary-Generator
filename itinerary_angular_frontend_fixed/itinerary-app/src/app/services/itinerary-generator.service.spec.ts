import { TestBed } from '@angular/core/testing';

import { ItineraryGeneratorService } from './itinerary-generator.service';

describe('ItineraryGeneratorService', () => {
  let service: ItineraryGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItineraryGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
