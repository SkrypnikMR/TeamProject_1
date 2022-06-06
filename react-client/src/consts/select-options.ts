export enum FilterType {
  JSON = 'JSON',
  YAML = 'YAML',
  XML = 'XML',
  CSV = 'CSV',
}

export enum FilterTheme {
  ALLTHEMES = 'ALLTHEMES',
  HTML = 'HTML',
  CSS = 'CSS',
  JAVASCRIPT = 'JAVASCRIPT',
  GIT = 'GIT',
  ERUDITION = 'ERUDITION',
}

export const TYPE_FILTER_OPTIONS = [
  { label: FilterType.JSON, value: FilterType.JSON },
  { label: FilterType.YAML, value: FilterType.YAML },
  { label: FilterType.XML, value: FilterType.XML },
  { label: FilterType.CSV, value: FilterType.CSV },
];

export const THEME_FILTER_OPTIONS = [
  { label: FilterTheme.ALLTHEMES, value: FilterTheme.ALLTHEMES },
  { label: FilterTheme.HTML, value: FilterTheme.HTML },
  { label: FilterTheme.CSS, value: FilterTheme.CSS },
  { label: FilterTheme.JAVASCRIPT, value: FilterTheme.JAVASCRIPT },
  { label: FilterTheme.GIT, value: FilterTheme.CSS },
  { label: FilterTheme.ERUDITION, value: FilterTheme.ERUDITION },
];
