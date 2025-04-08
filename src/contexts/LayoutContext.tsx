import { createContext, ReactNode, useEffect, useState } from 'react';

interface LayoutSize {
  layoutSize: 'large' | 'medium' | 'small' | 'xsmall';
  mobile: boolean;
}

const defaultLayoutSize: LayoutSize = { layoutSize: 'large', mobile: false };

export const LayoutContext = createContext<LayoutSize>(defaultLayoutSize);

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const getLayoutSize = (): 'large' | 'medium' | 'small' | 'xsmall' => {
    if (window.innerWidth >= 1024) {
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

  const mobile = layoutSize === 'xsmall' || layoutSize === 'small';

  return (
    <LayoutContext.Provider value={{ layoutSize, mobile }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
