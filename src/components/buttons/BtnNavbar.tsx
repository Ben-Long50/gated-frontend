import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const BtnNavbar = (props) => {
  const [hover, setHover] = useState(false);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <button
      aria-label={props.ariaLabel}
      className={`${props.className} timing w-full ${hover ? 'text-accent' : 'text-primary'} gap-8 text-xl`}
      type={props.type}
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </button>
  );
};

export default BtnNavbar;
