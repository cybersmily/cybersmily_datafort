import { TestBed } from '@angular/core/testing';

import { Cp2020DeckmanagerPdfSectionService } from './cp2020-deckmanager-pdf-section.service';

describe('Cp2020DeckmanagerPdfSectionService', () => {
  let service: Cp2020DeckmanagerPdfSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cp2020DeckmanagerPdfSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
