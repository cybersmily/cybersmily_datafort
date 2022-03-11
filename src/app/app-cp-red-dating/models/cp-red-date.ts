export class CpRedDate {
  keywords: Array<string>;
  location: string;
  activity: string;
  type: string;
  beginning: string;
  middle: string;
  end: string;
  outcome?: string;

  constructor() {
    this.keywords = new Array<string>();
    this.location = "";
    this.type = "";
    this.activity = "";
    this.beginning = "";
    this.middle = "";
    this.end = "";
  }
}
