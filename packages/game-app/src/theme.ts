import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  input: {
    variants: {
      default: {
        border: '1px solid #D7D2CB',
      },
      defaultError: {
        border: '1px solid red',
      },
      clear: {
        border: 'none',
      },
    },
  },
  iconButton: {
    variants: {
      default: {
        background: '#1A1818',
      },
    },
  },
  colors: {
    primary: '#2C3644',
    primaryLight: '#465060',
    backgroundLight: '#ffffff',
    secondary: '#ffd700',
    secondaryDark: '#FDC300',
    activeAccent: '#00867c',
    activeAccentLight: '#36B2AF',
    textColor: '#101820',
    buttonGrey: '#B4AEA9',
  },
  space: [0, 4, 8, 16, 24, 32, 40],
  cardsTypes: {
    'game-rule': 'linear-gradient(90deg, #b685ab 0%, #711d60 100%)',
    'pipeline-step': 'linear-gradient(90deg, #52c2b0 0%, #009778 100%)',
    review: 'linear-gradient(90deg, #fd9468 0%, #f34600 100%)',
    scenario: 'linear-gradient(90deg, #6ed6ea 0%, #00bddd 100%)',
  },
  mobile: '1100px',
};
export default theme;
