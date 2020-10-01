import { NewsItem } from './news-item';
import { NewsItems } from './news-items';

export class GigNewsItem implements NewsItems {
  news: Array<NewsItem>;
}
