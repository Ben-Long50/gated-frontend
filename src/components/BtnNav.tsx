import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const BtnNav = (props) => {
  const [hover, setHover] = useState(false);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <div className={`${props.position}`}>
      <ThemeContainer
        chamfer="16"
        borderColor={hover ? accentPrimary : 'transparent'}
      >
        <button
          aria-label={props.ariaLabel}
          className={`${props.className} timing w-full ${hover ? 'text-accent' : 'text-primary'} bg-primary px-4 py-1 text-lg clip-4`}
          type={props.type}
          onClick={props.onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {props.children}
        </button>
      </ThemeContainer>
    </div>
  );
};

export default BtnNav;
