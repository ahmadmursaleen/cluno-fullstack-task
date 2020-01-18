import { TestBed } from '@angular/core/testing';

import { ClunoCarsService } from './cluno-cars.service';

describe('ClunoCarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClunoCarsService = TestBed.get(ClunoCarsService);
    expect(service).toBeTruthy();
  });
});
