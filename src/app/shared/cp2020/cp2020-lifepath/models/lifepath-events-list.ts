import { LifepathEvent } from './lifepath-event';

export class LifepathEventsList {

  NumberOfYears: number;
  Events: LifepathEvent[];
  Age: number;

  constructor() {
    this.NumberOfYears = 0;
    this.Events = [];
    this.Age = 0;
  }
}
