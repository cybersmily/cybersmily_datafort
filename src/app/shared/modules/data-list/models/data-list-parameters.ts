import { KeyValue } from '@angular/common';
export interface DataListColumnParameters {
  header: string;
  headerClass: string;
  inputType: string;
  property: string;
  filters: string;
  class: string;
  sort?: string;
  filterValues?: Array<KeyValue<string, string>>;
  isSourcebook?: boolean;
}
