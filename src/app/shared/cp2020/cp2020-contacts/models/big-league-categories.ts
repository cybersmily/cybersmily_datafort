import { BigLeagueCategory } from './big-league-category';
export class BigLeagueCategories {

  get capabilities(): Array<BigLeagueCategory> {
    return [
      {name: 'Snitch', effect: '5+1D10', cost: 5},
      {name: 'Incapable', effect: '10+1D10', cost: 10},
      {name: 'Capable', effect: '15+1D10', cost: 15},
      {name: 'Very Capable', effect: '20+1D10', cost: 25},
      {name: 'Super Capable', effect: '25+1D10', cost: 40}
      ];
  }

  get reputations(): Array<BigLeagueCategory> {
    return [
      {name: '0-2', effect: 'very narrow field within their occupation',  multiplier: 0.5},
      {name: '3-5', effect: 'typical field within their occupation',  multiplier: 1},
      {name: '6-8', effect: 'wide field with in their occupation',  multiplier: 1.5},
      {name: '9-10', effect: 'expansive field in their occupation.',  multiplier: 2}
      ];
  }

  get availabilities(): Array<BigLeagueCategory> {
    return [
    {name: 'Seldom', effect: 'LUCK+1D10 vs 18', multiplier: 0.5},
    {name: 'Sometimes', effect: 'LUCK+1D10 vs 12', multiplier: 1},
    {name: 'Often', effect: 'LUCK+1D10 vs 8', multiplier: 1.5},
    {name: 'Always', effect: 'LUCK+1D10 vs 5', multiplier: 2}
    ];
  }

  get reliabilities(): Array<BigLeagueCategory> {
    return [
    {name: 'Unreliable', effect: 'Failed capablity roll will deceive, Critical failure will backstab.', multiplier: 0.5},
    {name: 'Reliable', effect: 'Failed capablity roll can\'t help, critical failure will deceive.', multiplier: 1},
    {name: 'Very Reliable',
      effect: 'Failed capablity roll can\'t help now, but will try again 1d6+1 days later. Critical failure cannot help at all.',
      multiplier: 1.5},
    {name: 'Super Reliable',
      effect: 'Failed capablity roll can\'t help now but will help 1d6+1 days later. Critical failure will try in 1d6+1 days later.',
      multiplier: 2}
    ];
  }
}
