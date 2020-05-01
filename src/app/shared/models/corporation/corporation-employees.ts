import { CorporationKeyMember } from './corporation-key-member';

export interface CorporationEmployees {
  workers: number;
  troops: number;
  covert: number;
  notable: CorporationKeyMember[];
}
