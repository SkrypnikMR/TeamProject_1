import { css } from 'styled-components';
import { BaseStyledProps } from 'types';

export const BaseStylesMixin = css<BaseStyledProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};

  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}

  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight};`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}

  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop};`}
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight};`}
  ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom};`}
  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft};`}

  ${({ boxSizing }) => boxSizing && `box-sizing: ${boxSizing};`}

  ${({ border }) => border && `border: ${border};`}
  ${({ borderTop }) => borderTop && `border-top: ${borderTop};`}
  ${({ borderRight }) => borderRight && `border-right: ${borderRight};`}
  ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom};`}
  ${({ borderLeft }) => borderLeft && `border-left: ${borderLeft};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ borderColor }) => borderColor && `border-color: ${borderColor};`}

  ${({ display }) => display && `display: ${display};`}

  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ overflowX }) => overflowX && `overflow-x: ${overflowX};`}
  ${({ overflowY }) => overflowY && `overflow-y: ${overflowY};`}

  ${({ position }) => position && `position: ${position};`}

  ${({ textOverflow }) => textOverflow && `text-overflow: ${textOverflow};`}
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}

  ${({ background }) => background && `background: ${background};`}
  ${({ color }) => color && `color: ${color};`}

  ${({ cursor }) => cursor && `cursor: ${cursor};`}
`;
