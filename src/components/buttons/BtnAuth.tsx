import { ReactNode, useContext, useState } from 'react';
import ThemeContainer from '../ThemeContainer';
import { ThemeContext } from '../../contexts/ThemeContext';

const BtnAuth = ({
  onClick,
  children,
  className,
  active,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  active?: boolean;
}) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className="shadow-md"
      borderColor={active ? accentPrimary : borderColor}
      chamfer="small"
    >
      <button
        className={`${className} ${active ? 'bg-primary text-accent' : 'bg-secondary text-secondary'} hover:bg-primary md:hover:text-accent timing flex w-full items-center justify-center p-2 text-lg clip-4`}
        onClick={onClick}
        onMouseEnter={() => {
          setBorderColor(accentPrimary);
        }}
        onMouseLeave={() => {
          setBorderColor('transparent');
        }}
      >
        {children}
      </button>
    </ThemeContainer>
  );
};
export default BtnAuth;
