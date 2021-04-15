import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../../services/file-services/data.service';
import { TestBed } from '@angular/core/testing';

import { CyberDataService } from './cyber-data.service';

describe('CyberDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: CyberDataService = TestBed.get(CyberDataService);
    expect(service).toBeTruthy();
  });
});
