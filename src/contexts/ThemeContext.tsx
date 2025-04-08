import { createContext, ReactNode, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  changeTheme: () => void;
  accentPrimary: string;
  accentSecondary: string;
  accentModifier: string;
  errorPrimary: string;
  rarityColorMap: object;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    } else {
      localStorage.setItem('theme', 'light');
      return 'light';
    }
  });

  const accentPrimary = 'rgb(253 224 71)';
  const accentSecondary = 'rgb(14 165 233)';
  const accentModifier = 'rgb(74 222 128)';
  const errorPrimary = 'rgb(239 68 68)';

  const rarityColorMap = {
    common: 'rgb(156 163 175)',
    uncommon: 'rgb(34 197 94)',
    rare: 'rgb(220 38 38)',
    blackMarket: 'rgb(126 34 206)',
    artifact: 'rgb(251 191 36)',
  };

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        accentPrimary,
        accentSecondary,
        accentModifier,
        errorPrimary,
        rarityColorMap,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
