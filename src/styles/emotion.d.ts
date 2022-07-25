/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';

import CustomTheme from './themes';

type CustomThemeType = typeof CustomTheme;

declare module '@emotion/react' {
  export interface Theme extends CustomThemeType {}
}