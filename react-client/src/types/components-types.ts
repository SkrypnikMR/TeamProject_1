import { ReactNode } from 'react';
import { FilterTheme, FilterType } from 'consts';
import { ValueOf } from './main';

export interface DefaultOptionType {
  label: ReactNode;
  value?: string | number | null;
}

export type ThemeSelect = ValueOf<FilterTheme>;
export type TypeSelect = ValueOf<FilterType>;
