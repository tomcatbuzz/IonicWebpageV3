import { TestBed } from '@angular/core/testing';

import { DarkModeService } from './darkmode.service';

describe('DarkmodeService', () => {
  let service: DarkModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
