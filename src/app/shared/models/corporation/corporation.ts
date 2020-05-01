import { CorporationIntent } from './corporation-intent';
import { CorporationEmployees } from './corporation-employees';
import { CorporationResources } from './corporation-resources';
import { CorporationOffices } from './corporation-offices';
import { CorporationEquipment } from './corporation-equipment';

export class Corporation {
  name: string;
  logo: string;
  slogan: string;
  history: string;
  resources?: CorporationResources;
  employees?: CorporationEmployees;
  offices?: CorporationOffices;
  intent?: CorporationIntent;
  equipment?: CorporationEquipment;

  constructor() {
    this.name = '';
    this.logo = '';
    this.slogan = '';
    this.history = '';
    this.resources = { value: '',
                      stock: { shares: 0, price: 0},
                      majorityholder: { name: ''},
                      resources: '' };
    this.employees = {
      workers: 0,
      troops: 0,
      covert: 0,
      notable: new Array()
    };
    this.offices = {
      headquarters: '',
      regionaloffices: {description: '', locations: new Array()},
      coporatehq: '',
      location: '',
      architecture: '',
      interiorsandfacilities: '',
      personnel: '',
      security: '',
      specialfacilities: '',
      rd: '',
      labs: '',
      factories: '',
      stores: '',
      spacefacilities: ''};
    this.intent = {
      goal: '',
      longterm: '',
      products: new Array(),
      allies: new Array(),
      enemies: new Array()
    };
    this.equipment = {
      executive: '',
      employees: '',
      staff: '',
      guards: '',
      vehicles: '',
      equipment: '',
      weapons: ''
    };

  }
}
