import { CorporationRegionalOffice } from './corporation-regional-offices';

export interface CorporationOffices {
  headquarters: string;
  regionaloffices: CorporationRegionalOffice;
  coporatehq: string;
  location: string;
  architecture: string;
  interiorsandfacilities: string;
  personnel: string;
  security: string;
  specialfacilities: string;
  rd: string;
  labs: string;
  factories?: string;
  stores?: string;
  spacefacilities?: string;
}
