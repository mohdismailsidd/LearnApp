import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { Course } from './course-service.service';

describe('BaseService', () => {
  let service: BaseService<Course>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
