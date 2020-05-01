import { CorporationSubsidary } from './corporation-subsidary';
import { CorporationKeyMember } from './corporation-key-member';
import { CorporationStock } from './corporation-stock';

export interface CorporationResources {
  value: string;
  stock: CorporationStock;
  majorityholder: CorporationKeyMember;
  resources: string;
  subsidaries?: CorporationSubsidary[];
}
