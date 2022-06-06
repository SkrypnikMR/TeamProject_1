import React from 'react';
import { Select } from 'antd';

import { DefaultOptionType } from 'types';

interface QuestionSelectProps {
  onChange: (arg: string) => void;
  placeholder?: string;
  options?: DefaultOptionType[];
  value: any;
  size?: 'large' | 'small';
}

function QuestionsSelect({ onChange, placeholder, options, value, size }: QuestionSelectProps) {
  return (
    <Select onChange={onChange} placeholder={placeholder} value={value} size={size}>
      {options?.map(({ label, value }) => (
        <Select.Option key={`${label} ${value}`} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
}

export default QuestionsSelect;
