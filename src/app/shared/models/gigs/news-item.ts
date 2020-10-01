import {NewsReport} from './news-report';

export interface NewsItem {
  title: string;
  reports: Array<NewsReport>;
}
