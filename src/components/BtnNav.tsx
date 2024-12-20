import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const BtnNav = (props) => {
  const [hover, setHover] = useState(false);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      chamfer="16"
      borderColor={hover ? accentPrimary : 'transparent'}
    >
      <button
        aria-label={props.ariaLabel}
        className={`${props.className} timing w-full ${hover ? 'text-accent' : 'text-primary'} bg-secondary flex items-center justify-start gap-8 px-4 pb-1 pt-2 text-lg clip-4`}
        type={props.type}
        onClick={props.onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.children}
      </button>
    </ThemeContainer>
  );
};

export default BtnNav;
