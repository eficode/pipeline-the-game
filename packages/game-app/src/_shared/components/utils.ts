import { Path } from '../i18n/utils';
import { DefaultTheme } from 'styled-components';

export function getFromTheme(type: Path<DefaultTheme>) {
  return ({ theme }: { theme: DefaultTheme }) =>
    (type.split('.').reduce((o, i) => o[i as keyof typeof o] as any, theme) as unknown) as string;
}
