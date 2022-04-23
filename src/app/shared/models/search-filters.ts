export interface SearchFilters {
  [key: string]: SearchValue;
}

export interface SearchValue {
  value: any;
  exact: boolean;
}
