import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../data.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { MaxMetalDataService } from './max-metal-data.service';

describe('MaxMetalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [DataService]

  }));

  it('should be created', () => {
    const service: MaxMetalDataService = TestBed.get(MaxMetalDataService);
    expect(service).toBeTruthy();
  });

  it('should load the data', async( inject([MaxMetalDataService], (service: MaxMetalDataService) => {
    service.loadMaxMetalData().subscribe( isLoaded => {
      expect(isLoaded).toBeTruthy();
    });
  })));

  it('should load the vehicle types', async( inject([MaxMetalDataService], (service: MaxMetalDataService) => {
    service.loadVehicleTypes().subscribe( data => {
      expect(data).toBeTruthy();
    });
  })));

  it('should load weapons', async( inject([MaxMetalDataService], (service: MaxMetalDataService) => {
    service.loadWeapons().subscribe( data => {
      expect(data).toBeTruthy();
    });
  })));
  it('should load options', async( inject([MaxMetalDataService], (service: MaxMetalDataService) => {
    service.loadOptions().subscribe( data => {
      expect(data).toBeTruthy();
    });
  })));
  it('should load mounts', async( inject([MaxMetalDataService], (service: MaxMetalDataService) => {
    service.loadWeaponMounts().subscribe( data => {
      expect(data).toBeTruthy();
    });
  })));
});
