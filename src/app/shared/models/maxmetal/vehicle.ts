import { SourceBook } from '../sourcebook';

/**
 * Vehicle attributes for the CP 2020
 * @export
 * @interface Vehicle
 */
export interface Vehicle {
  name: string;
  description: string;
  topspeed?: number;
  accelerate?: number;
  decelerate?: number;
  crew?: number;
  range?: number;
  passengers?: number;
  cargo?: string;
  manuever?: number;
  sdp?: number;
  sp?: number;
  type?: string;
  mass?: string;
  cost?: string;
  options?: string;
  source?: SourceBook;
}

