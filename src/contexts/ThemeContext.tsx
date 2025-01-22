import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        localStorage.setItem('theme', 'dark');
        return 'dark';
      } else {
        localStorage.setItem('theme', 'light');
        return 'light';
      }
    }
  });

  const accentPrimary = 'rgb(253 224 71)';
  const accentSecondary = 'rgb(14 165 233)';
  const accentModifier = 'rgb(74 222 128)';
  const errorPrimary = 'rgb(239 68 68)';

  const changeTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
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
