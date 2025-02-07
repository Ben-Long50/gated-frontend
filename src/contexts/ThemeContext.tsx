import { createContext, ReactNode, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  changeTheme: () => void;
  accentPrimary: string;
  accentSecondary: string;
  accentModifier: string;
  errorPrimary: string;
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
