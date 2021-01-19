import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  input: {
    variants: {
      default: {
        border: '1px solid #9a9a9a',
      },
      clear: {
        border: 'none',
      },
    },
  },
  colors: {
    primary: '#2C3644',
    primaryLight: '#465060',
    secondary: '#ffd700',
    activeAccent: '#00867c',
    activeAccentLight: '#36B2AF',
  },
  space: [0, 4, 8, 16, 24, 32],
  cardsTypes: {
    'game-rule': 'linear-gradient(90deg, #b685ab 0%, #711d60 100%)',
    'pipeline-step': 'linear-gradient(90deg, #52c2b0 0%, #009778 100%)',
    review: 'linear-gradient(90deg, #fd9468 0%, #f34600 100%)',
    scenario: 'linear-gradient(90deg, #6ed6ea 0%, #00bddd 100%)',
  },
};
export default theme;
