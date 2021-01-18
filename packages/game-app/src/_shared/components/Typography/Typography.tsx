import styled from 'styled-components';
import { typography, TypographyProps, variant, margin, MarginProps } from 'styled-system';

type TypographyVariants = 'label' | 'title' | 'content' | 'contentHead';

const Typography = styled.div<{ variant?: TypographyVariants } & TypographyProps & MarginProps>`
  ${typography}
  ${margin}
  ${variant({
    variants: {
      label: {
        fontSize: '14px',
        fontFamily: 'Montserrat',
      },
      title: {
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
    },
  })}
`;

Typography.displayName = 'Typography';

export default Typography;
