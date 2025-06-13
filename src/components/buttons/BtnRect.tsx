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
  onClick?: (e: MouseEvent) => void;
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
        className={`timing bg-primar w-full rounded-bl rounded-tr px-4 py-2 text-lg text-zinc-950 clip-4`}
        style={{
          backgroundColor: !hover && accentPrimary,
          color: hover && accentPrimary,
        }}
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
