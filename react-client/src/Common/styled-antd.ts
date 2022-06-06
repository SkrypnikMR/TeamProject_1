import styled from 'styled-components';
import { BaseStylesMixin } from './mixins';
import { Card as AntdCard, Layout as AntdLayout } from 'antd';

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

export const Layout = styled(AntdLayout)`
  &&&& {
    ${BaseStylesMixin};
  }
`;

export const LayoutHeader = styled(AntdLayout.Header)`
  &&&& {
    ${BaseStylesMixin};
  }
`;

export const LayoutFooter = styled(AntdLayout.Footer)`
  &&&& {
    ${BaseStylesMixin};
  }
`;

export const LayoutContent = styled(AntdLayout.Content)`
  &&&& {
    ${BaseStylesMixin};
  }
`;
