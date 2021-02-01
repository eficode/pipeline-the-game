import styled from 'styled-components';
import { Typography } from '@pipeline/components';

export const Title = styled(Typography)`
  :after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 currentColor, 0.5em 0 0 currentColor;
    }
  }
`;

Title.displayName = 'Title';
