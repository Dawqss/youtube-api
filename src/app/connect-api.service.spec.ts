import { TestBed, inject } from '@angular/core/testing';

import { ConnectApiService } from './connect-api.service';

describe('ConnectApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectApiService]
    });
  });

  it('should be created', inject([ConnectApiService], (service: ConnectApiService) => {
    expect(service).toBeTruthy();
  }));
});
