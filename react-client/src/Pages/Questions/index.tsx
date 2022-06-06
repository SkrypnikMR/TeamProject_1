import React, { useState } from 'react';

import { FlexRow } from 'Common';
import QuestionSelect from 'Components/QuestionsSelect';
import Page from 'Components/Page';
import { THEME_FILTER_OPTIONS, TYPE_FILTER_OPTIONS, FilterTheme, FilterType } from 'consts';
import { ThemeSelect, TypeSelect } from 'types';

export function Questions() {
  const [type, setType] = useState<TypeSelect>(FilterType.JSON);
  const [theme, setTheme] = useState<ThemeSelect>(FilterTheme.ALLTHEMES);
  return (
    <Page title="Questions">
      <FlexRow>
        <FlexRow width="30%" justifyContent="flex-start" gap="10px">
          <QuestionSelect size="large" options={TYPE_FILTER_OPTIONS} onChange={setType} value={type} />
          <QuestionSelect size="large" options={THEME_FILTER_OPTIONS} onChange={setTheme} value={theme} />
        </FlexRow>
      </FlexRow>
    </Page>
  );
}
