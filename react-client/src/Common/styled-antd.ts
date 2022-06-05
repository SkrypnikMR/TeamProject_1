import styled from 'styled-components';
import { BaseStylesMixin } from './mixins';
import { Card as AntdCard } from 'antd';

export const StyledCard = styled(AntdCard)`
  &&&& {
    ${BaseStylesMixin};
  }
  .ant-card-actions {
    border-radius: 0 0 15px 15px;
    background: ${({ color }) => color};
    min-height: 60px;
  }
`;
