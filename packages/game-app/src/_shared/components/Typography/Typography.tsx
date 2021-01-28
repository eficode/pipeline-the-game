import styled from 'styled-components';
import {
  typography,
  TypographyProps,
  variant,
  margin,
  MarginProps,
  color,
  ColorProps,
  TextAlignProps,
  textAlign,
} from 'styled-system';

type TypographyVariants = 'label' | 'title' | 'content' | 'contentHead' | 'bigTitle' | 'dialogHead';

type CustomTypographyProps = { variant?: TypographyVariants } & TypographyProps &
  MarginProps &
  ColorProps &
  TextAlignProps;

const Typography = styled.div<CustomTypographyProps>`
  ${variant({
    variants: {
      label: {
        fontSize: '14px',
        fontFamily: 'Montserrat',
      },
      title: {
        fontSize: '32px',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
      dialogHead: {
        fontSize: '24px',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
      },
      content: {
        fontSize: '16px',
        fontFamily: 'Montserrat',
      },
      contentHead: {
        fontSize: '16px',
        fontFamily: 'Montserrat',
        whiteSpace: 'pre-line',
      },
      bigTitle: {
        fontSize: '56px',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
  })}
  ${typography} 
  ${margin} 
  ${color} 
  ${textAlign}
`;

Typography.displayName = 'Typography';

export default Typography;
