import { SourceBook } from '../../../models/sourcebook';

/**
 * Vehicle attributes for the CP 2020
 * @export
 * @interface Vehicle
 */
export interface VehicleData {
  name: string;
  description: string;
  topspeed?: number;
  accelerate?: number;
  decelerate?: number;
  crew?: number;
  range?: number;
  passengers?: number;
  cargo?: string;
  spaces?: number;
  manuever?: number;
  sdp?: number;
  sp?: number;
  type?: string;
  mass?: string;
  cost?: string;
  bookCost?: number;
  options?: string;
  weapons?: string;
  source?: SourceBook;
}
