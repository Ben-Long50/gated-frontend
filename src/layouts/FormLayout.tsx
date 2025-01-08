import { useContext } from 'react';
import ThemeContainer from '../components/ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const FormLayout = ({ children }, props) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className={`${props.className} mb-auto w-full max-w-5xl rounded-br-5xl rounded-tl-5xl shadow-xl shadow-slate-950`}
      chamfer="32"
      borderColor={accentPrimary}
    >
      {children}
    </ThemeContainer>
  );
};

export default FormLayout;
