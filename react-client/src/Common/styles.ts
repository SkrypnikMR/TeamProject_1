import styled from 'styled-components';

import { BaseStyledProps, FlexProps } from 'types';
import { BaseStylesMixin } from './mixins';

export const Container = styled.div<BaseStyledProps>`
  &&&& {
    ${BaseStylesMixin};
  }
`;

export const Span = styled.span<BaseStyledProps>`
  &&&& {
    ${BaseStylesMixin};
  }
`;

export const Image = styled.img<BaseStyledProps>`
  &&&& {
    ${BaseStylesMixin}
  }
`;

export const FlexRow = styled(Container)<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'space-between')};

  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}

  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ flexFlow }) => flexFlow && `flex-flow: ${flexFlow};`}
`;

export const FlexCol = styled(FlexRow)`
  flex-direction: column;
`;
