import { BigLeagueContact } from './big-league-contact';
import { TestBed } from '@angular/core/testing';
import { BigLeagueCategories } from './big-league-categories';

describe('BigLeagueContact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const contact = new BigLeagueContact();
    expect(contact).toBeTruthy();
  });

  it('should calculate cost', () => {
    const contact = new BigLeagueContact();
    const categories = new BigLeagueCategories();
    const cap = categories.capabilities[0];
    contact.capability = cap;
    const avail = categories.availabilities[0];
    contact.availability = avail;
    const rel = categories.reliabilities[0];
    contact.reliability = rel;
    const rep = categories.reputations[0];
    contact.reputation = rep;
    const expectedCost = cap.cost * avail.multiplier * rel.multiplier * rep.multiplier;
    expect(contact.cost === expectedCost).toBeTruthy();
  });
});
