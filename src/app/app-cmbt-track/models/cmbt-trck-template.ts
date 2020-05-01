import { CmbtTrckOppTemplate } from './cmbt-trck-opp-template';
export interface CmbtTrckTemplate {
  name: string;
  type: string;
  json: string;
  desc: string;
  source: string;
  page: number;
  template?: CmbtTrckOppTemplate;
}
