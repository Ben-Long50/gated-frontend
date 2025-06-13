import { createContext, ReactNode, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  changeTheme: () => void;
  accentPrimary: string;
  changeAccent: (color: string) => void;
  errorPrimary: string;
  rarityColorMap: object;
  statColorMap: object;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      document.documentElement.classList.add(storedTheme);
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

  const [accentPrimary, setAccentPrimary] = useState(() => {
    const storedAccent = localStorage.getItem('accent');
    if (storedAccent) {
      return storedAccent;
    } else {
      return 'rgb(253 224 71)';
    }
  });

  const errorPrimary = 'rgb(239 68 68)';

  const rarityColorMap = {
    common: 'rgb(156 163 175)',
    uncommon: 'rgb(34 197 94)',
    rare: 'rgb(220 38 38)',
    blackMarket: 'rgb(126 34 206)',
    artifact: 'rgb(251 191 36)',
  };

  const statColorMap = {
    Health: 'rgb(248 113 113)',
    Sanity: 'rgb(96 165 250)',
    Cyber: 'rgb(52 211 153)',
    Equip: 'rgb(251 191 36)',
    DMG: 'rgb(252, 91, 50)',
    SLV: 'rgb(219, 123, 33)',
    FLR: 'rgb(219, 123, 33)',
    RNG: 'rgb(33, 194, 219)',
    WGT: 'rgb(251 191 36)',
    MAG: 'rgb(107, 255, 124)',
    AV: 'rgb(219, 123, 33)',
    WV: 'rgb(137, 39, 217)',
    BP: 'rgb(33, 194, 219)',
    PWR: 'rgb(107, 255, 124)',
    CBR: 'rgb(52 211 153)',
    SZE: 'rgb(251 191 36)',
    SPD: 'rgb(33, 194, 219)',
    AGL: 'rgb(107, 255, 124)',
    HULL: 'rgb(248 113 113)',
    CRG: 'rgb(39, 217, 167)',
    HGR: 'rgb(219, 123, 33)',
    PASS: 'rgb(137, 39, 217)',
    TUR: 'rgb(52 211 153)',
    WPN: 'rgb(252, 91, 50)',
    STACKS: 'rgb(33, 194, 219)',
    AP: 'rgb(252, 91, 50)',
    RP: 'rgb(219, 123, 33)',
    wyrmShells: 'rgb(33, 194, 219)',
    WMS: 'rgb(52 211 153)',
    WMP: 'rgb(33, 194, 219)',
    EC: 'rgb(137, 39, 217)',
  };

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };

  const changeAccent = (color: string) => {
    localStorage.setItem('accent', color);
    setAccentPrimary(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        accentPrimary,
        changeAccent,
        errorPrimary,
        rarityColorMap,
        statColorMap,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
