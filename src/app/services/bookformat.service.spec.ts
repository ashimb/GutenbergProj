import { TestBed } from '@angular/core/testing';

import { BookformatService } from './bookformat.service';

describe('BookformatService', () => {
  let service: BookformatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookformatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
