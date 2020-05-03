import { BigLeagueContact } from './../../models/fixer/big-league-contact';
import { TestBed, async, inject } from '@angular/core/testing';

import { FixerBigLeagueService } from './fixer-big-league.service';
import { BigLeagueCategory } from '../../models/fixer/big-league-category';

describe('FixerBigLeagueService', () => {
  let contacts: {
    snitch: BigLeagueContact,
    incapable: BigLeagueContact,
    capable: BigLeagueContact,
    verycapable: BigLeagueContact,
    supercapable: BigLeagueContact
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    contacts = {
        snitch: new BigLeagueContact({
        name: 'snitch',
        capability: {name: 'Snitch', effect: '', cost: 5},
        reliability: {name: '', effect: '', multiplier: 1},
        availability: {name: '', effect: '', multiplier: 1},
        reputation: {name: '', effect: '', multiplier: 1}
      }),
      // returns 1.25
        incapable: new BigLeagueContact({
        name: 'Incapable',
        capability: {name: 'Incapable', effect: '', cost: 10},
        reliability: {name: 'unreliable', effect: '', multiplier: 0.5},
        availability: {name: 'seldom', effect: '', multiplier: 0.5},
        reputation: {name: '0-2', effect: '', multiplier: 0.5}
      }),
      // returns 50.625
      capable:  new BigLeagueContact({
        name: 'capable',
        capability: {name: 'capable', effect: '', cost: 15},
        reliability: {name: 'very', effect: '', multiplier: 1.5},
        availability: {name: 'often', effect: '', multiplier: 1.5},
        reputation: {name: '6-8', effect: '', multiplier: 1.5}
      }),
      // returns 200
      verycapable: new BigLeagueContact({
        name: 'very capable',
        capability: {name: 'very capable', effect: '', cost: 25},
        reliability: {name: 'Super', effect: '', multiplier: 2},
        availability: {name: 'Always', effect: '', multiplier: 2},
        reputation: {name: '9-10', effect: '', multiplier: 2}
      }),
      // returns 40 points
      supercapable: new BigLeagueContact({
        name: 'Super-Capable',
        capability: {name: 'Super-Capable', effect: '', cost: 40},
        reliability: {name: 'Super', effect: '', multiplier: 2},
        availability: {name: 'seldom', effect: '', multiplier: 0.5},
        reputation: {name: '3-5', effect: '', multiplier: 1}
      })
    }
  });

  it('should be created', () => {
    const service: FixerBigLeagueService = TestBed.get(FixerBigLeagueService);
    expect(service).toBeTruthy();
  });

  it('should have Streeteal of 5', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.model.subscribe( data => {
      expect(data).toBeTruthy(data);
      expect(data.contacts.length === 0).toBeTruthy('Big League contacts should be empty.');
      expect(data.streetdeal === 5).toBeTruthy('Hot stuff streetdeal should be 5');
      expect(service.totalPoints === 100).toBeTruthy('Big League with Streedeal of 5 is not (5*2) * (5*2) = 100 resource points.');
      expect(service.spentPoints === 0).toBeTruthy('Big League spent points is not 0.');
    });
  })));

  it('should add Contact', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addContact(contacts.snitch); // 5 pts
    service.addContact(contacts.supercapable); // 40 pts
    service.addContact(contacts.capable); // 50.625
    service.addContact(contacts.incapable); // 1.25
    service.model.subscribe( data => {
      expect(data).toBeTruthy(data);
      expect(data.contacts.length === 4).toBeTruthy('Big League contacts should have 4 elements.');
      expect(service.spentPoints === 96.875).toBeTruthy('Big League spent points is not 96.875.');
    });
  })));

  it('should not  add Contacts', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addContact(contacts.verycapable);  // 200 pts
    service.model.subscribe( data => {
      expect(data).toBeTruthy(data);
      expect(data.contacts.length === 0).toBeTruthy('Big League contacts is not empty.');
      expect(service.spentPoints === 0).toBeTruthy('Big League spent points is not 0.');
    });
  })));

  it('should delete Contact', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addContact(contacts.snitch); // 5 pts
    service.addContact(contacts.supercapable); // 40 pts
    service.addContact(contacts.capable); // 50.625
    service.addContact(contacts.incapable); // 1.25
    service.deleteContact(2); // remove capable
    service.model.subscribe( data => {
      expect(data).toBeTruthy(data);
      expect(data.contacts.length === 3).toBeTruthy('Big League contacts should have 3 elements.');
      expect(service.spentPoints === 46.25).toBeTruthy('Big League spent points is not 46.25.');
      expect(!(data.contacts.some(c => c.name.toLowerCase() === 'capable'))).toBeTruthy('Big League did not delete capable contact');
    });
  })));

  it('should clear Contacts', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addContact(contacts.snitch); // 5 pts
    service.addContact(contacts.supercapable); // 40 pts
    service.addContact(contacts.capable); // 50.625
    service.addContact(contacts.incapable); // 1.25
    service.reset(); // remove capable
    service.model.subscribe( data => {
      expect(data.contacts.length === 0).toBeTruthy('Big League contacts should be empty');
      expect(service.spentPoints === 0).toBeTruthy('Big League spent points is not 0.');
    });
  })));

  it('should update Contacts', async(inject([FixerBigLeagueService], (service: FixerBigLeagueService) => {
    service.reset();
    service.setStreetdeal(5);
    service.addContact(contacts.snitch); // 5 pts
    service.addContact(contacts.supercapable); // 40 pts
    const snitch = new BigLeagueContact(contacts.snitch);
    snitch.capability.cost = 10;
    snitch.availability.multiplier = 2;
    service.updateContact(snitch);
    service.model.subscribe( data => {
      expect(data.contacts.length === 2).toBeTruthy('Big League contacts should be empty');
      expect(service.spentPoints === 60).toBeTruthy('Big League updated spent points is not 60.');
      const update = data.contacts.find(c => c.name.toLowerCase() === 'snitch');
      expect(update.cost === 20).toBeTruthy('Big League udpated contact did not change cost');
    });
  })));

});
