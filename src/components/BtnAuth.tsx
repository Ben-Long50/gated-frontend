import { useContext, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const BtnAuth = (props) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer borderColor={borderColor} chamfer="16" className="clip-4">
      <button
        className="text-secondary hover:bg-primary md:hover:text-accent bg-secondary timing flex w-full items-center justify-center p-2 text-lg"
        onClick={props.onClick}
        onMouseEnter={() => {
          setBorderColor(accentPrimary);
        }}
        onMouseLeave={() => {
          setBorderColor('transparent');
        }}
      >
        {props.children}
      </button>
    </ThemeContainer>
  );
};
export default BtnAuth;
