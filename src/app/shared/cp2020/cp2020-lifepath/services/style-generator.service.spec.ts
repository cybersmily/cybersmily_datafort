import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { StyleGeneratorService } from './style-generator.service';

describe('StyleGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [
        DataService,
        DiceService,
        provideHttpClient(withInterceptorsFromDi())
    ]
}));

  it('should be created', () => {
    const service: StyleGeneratorService = TestBed.get(StyleGeneratorService);
    expect(service).toBeTruthy();
  });

  it('should have motivations', waitForAsync(inject([StyleGeneratorService], (service: StyleGeneratorService) => {
    service.GenerateStyles('CP2020').subscribe( data => {
      expect(data).toBeTruthy('Does not have data.');
      expect(data.affectations && data.affectations !== '').toBeTruthy('Does not have affectations.');
      expect(data.clothes && data.clothes !== '').toBeTruthy('Does not have clothing.');
      expect(data.hairstyle && data.hairstyle !== '').toBeTruthy('Does not have hairstyle.');
    });
  })));
});
