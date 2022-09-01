import { BigLeagueCategories } from './big-league-categories';
import { TestBed } from '@angular/core/testing';

describe('BigLeagueCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const cats = new BigLeagueCategories();
    expect(cats).toBeTruthy();
    expect(cats.capabilities).toBeTruthy();
    expect(cats.availabilities).toBeTruthy();
    expect(cats.reliabilities).toBeTruthy();
    expect(cats.reliabilities).toBeTruthy();
    expect(Array.isArray(cats.capabilities)).toBeTruthy();
    expect(Array.isArray(cats.availabilities)).toBeTruthy();
    expect(Array.isArray(cats.reliabilities)).toBeTruthy();
    expect(Array.isArray(cats.reliabilities)).toBeTruthy();
  });

  it('should capability have cost and not multiplier', () => {
    const cats = new BigLeagueCategories();
    expect(cats.capabilities[0].cost).toBeTruthy();
    expect(cats.capabilities[0].multiplier).toBeFalsy();
  });

  it('should reputation have multiplier and not cost', () => {
    const cats = new BigLeagueCategories();
    expect(cats.reputations[0].cost).toBeFalsy();
    expect(cats.reputations[0].multiplier).toBeTruthy();
  });

  it('should reliability have multiplier and not cost', () => {
    const cats = new BigLeagueCategories();
    expect(cats.reliabilities[0].cost).toBeFalsy();
    expect(cats.reliabilities[0].multiplier).toBeTruthy();
  });

  it('should availabilities have multiplier and not cost', () => {
    const cats = new BigLeagueCategories();
    expect(cats.availabilities[0].cost).toBeFalsy();
    expect(cats.availabilities[0].multiplier).toBeTruthy();
  });

});
