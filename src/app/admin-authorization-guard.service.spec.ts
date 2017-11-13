import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthorizationGuardService } from './admin-authorization-guard.service';

describe('AdminAuthorizationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthorizationGuardService]
    });
  });

  it('should be created', inject([AdminAuthorizationGuardService], (service: AdminAuthorizationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
