import React, { createContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { resolvePalette } from './palettes';

export const ThemeContext = createContext({
  themeName: undefined,
  colors: resolvePalette(),
});

export function ThemeProvider({ children }) {
  const themeName = useSelector((state) => state.auth?.user?.Color_Customization);

  const colors = useMemo(() => resolvePalette(themeName), [themeName]);

  const value = useMemo(() => ({ themeName, colors }), [themeName, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
