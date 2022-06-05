export interface BaseStyledProps {
  width?: string;
  height?: string;

  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;

  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;

  border?: string | false;
  borderTop?: string | false;
  borderRight?: string | false;
  borderBottom?: string | false;
  borderLeft?: string | false;
  borderRadius?: string | false;
  borderColor?: string | false;

  boxSizing?: string | false;

  display?: string;

  overflow?: string;
  overflowX?: string;
  overflowY?: string;

  position?: string;

  fontSize?: string;
  lineHeight?: string;
  textAlign?: string;
  textOverflow?: string;
  whiteSpace?: string;

  background?: string;
  color?: string;

  cursor?: string;
}

export interface FlexProps {
  gap?: string;

  alignItems?: string;
  justifyContent?: string;

  flex?: string;
  flexWrap?: string;
  flexFlow?: string;
}
