import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const BtnRect = (props) => {
  const [hover, setHover] = useState(false);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className={`${props.className}`}
      chamfer="16"
      borderColor={hover ? accentPrimary : 'transparent'}
    >
      <button
        aria-label={props.ariaLabel}
        className={`timing w-full ${hover ? `text-accent ${props.hoverBg ? props.hoverBg : 'bg-primary'}` : 'accent-primary'} px-4 py-2 text-lg clip-4`}
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

export default BtnRect;
