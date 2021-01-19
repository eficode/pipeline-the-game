import 'styled-components';
import { Theme, StylesProps } from 'styled-system';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    input: {
      variants: {
        default: object;
        clear: object;
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
    };
    cardsTypes: {
      [key: string]: string;
    };
  }
}