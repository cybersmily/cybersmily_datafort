import { BigLeagueCategory } from './big-league-category';
export interface BigLeagueContactParameters {
  name?: string;
  capability?: BigLeagueCategory;
  reputation?: BigLeagueCategory;
  availability?: BigLeagueCategory;
  reliability?: BigLeagueCategory;
  details?: string;
}
