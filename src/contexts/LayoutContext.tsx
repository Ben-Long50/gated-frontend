import { createContext, ReactNode, useEffect, useState } from 'react';

interface LayoutSize {
  layoutSize: 'large' | 'medium' | 'small' | 'xsmall';
}

const defaultLayoutSize: LayoutSize = { layoutSize: 'large' };

export const LayoutContext = createContext<LayoutSize>(defaultLayoutSize);

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const getLayoutSize = (): 'large' | 'medium' | 'small' | 'xsmall' => {
    if (window.innerWidth >= 1280) {
      return 'large';
    } else if (window.innerWidth > 500 && window.innerWidth < 640) {
      return 'small';
    } else if (window.innerWidth <= 500) {
      return 'xsmall';
    } else {
      return 'medium';
    }
  };

  const [layoutSize, setLayoutSize] =
    useState<LayoutSize['layoutSize']>(getLayoutSize);

  useEffect(() => {
    const handleResize = () => {
      setLayoutSize(getLayoutSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ layoutSize }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
