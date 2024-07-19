import { TestBed } from '@angular/core/testing';

import { EmitChangesService } from './emit-changes.service';

describe('EmitChangesService', () => {
  let service: EmitChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
