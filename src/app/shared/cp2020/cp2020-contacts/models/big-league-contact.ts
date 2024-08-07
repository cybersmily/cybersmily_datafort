import { BigLeagueCategory } from './big-league-category';
import { BigLeagueContactParameters } from './big-league-contact-parameters';
export class BigLeagueContact {
  name: string;
  capability: BigLeagueCategory;
  reputation: BigLeagueCategory;
  availability: BigLeagueCategory;
  reliability: BigLeagueCategory;
  details: string;

  constructor(param?: BigLeagueContactParameters) {
    this.name = param?.name ?? '';
    this.capability = param?.capability ?? null;
    this.reliability = param?.reliability ?? null;
    this.reputation = param?.reputation ?? null;
    this.availability = param?.availability ?? null;
    this.details = param?.details ?? '';
  }

  get cost(): number {
    let cost: number =
      this.capability && this.capability.cost ? this.capability.cost : 0;
    cost =
      cost *
      (this.reputation && this.reputation.multiplier
        ? this.reputation.multiplier
        : 1);
    cost =
      cost *
      (this.reliability && this.reliability.multiplier
        ? this.reliability.multiplier
        : 1);
    cost =
      cost *
      (this.availability && this.availability.multiplier
        ? this.availability.multiplier
        : 1);
    return cost;
  }
}
