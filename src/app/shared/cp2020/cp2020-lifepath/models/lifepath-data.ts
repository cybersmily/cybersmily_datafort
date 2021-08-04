import { LifepathChart } from './lifepath-chart';
import { LifepathSource } from './lifepath-source';

export interface LifepathData {
  sources: LifepathSource[];
  motivations: LifepathChart[];
  appearance: LifepathChart[];
  origins: any;
  family: any;
  lifeevents: any;
}
