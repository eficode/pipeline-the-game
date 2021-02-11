import 'styled-components';
import { Theme, StylesProps } from 'styled-system';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    input: {
      variants: {
        default: object;
        defaultError: object;
        clear: object;
      };
    };
    iconButton: {
      variants: {
        default: {
          background: string;
        };
      };
    };
    colors: {
      primary: string;
      primaryLight: string;
      secondary: string;
      secondaryDark: string;
      activeAccent: string;
      activeAccentLight: string;
      textColor: string;
      buttonGrey: string;
    };
    cardsTypes: {
      [key: string]: string;
    };
  }
}
