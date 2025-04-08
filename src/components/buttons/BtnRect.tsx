import { ReactNode, useContext, useState } from 'react';
import ThemeContainer from '../ThemeContainer';
import { ThemeContext } from '../../contexts/ThemeContext';

const BtnRect = ({
  className,
  ariaLabel,
  type,
  onClick,
  children,
}: {
  className?: string;
  ariaLabel: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const [hover, setHover] = useState(false);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className={`${className}`}
      chamfer="small"
      borderColor={hover ? accentPrimary : 'transparent'}
    >
      <button
        aria-label={ariaLabel}
        className={`timing w-full ${hover ? 'text-accent' : 'accent-primary'} bg-primary px-4 py-2 text-lg clip-4`}
        type={type}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </button>
    </ThemeContainer>
  );
};

export default BtnRect;
