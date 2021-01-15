import styled from 'styled-components';
import { variant } from 'styled-system';

const Typography = styled.div<{ variant?: 'label' }>`
  ${variant({
    variants: {
      label: {
        fontSize: '14px',
        fontFamily: 'Montserrat',
      },
    },
  })}
`;

Typography.displayName = 'Typography';

export default Typography;
