import { useContext } from 'react';
import ThemeContainer from '../components/ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const FormLayout = ({ children }) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-5xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      {children}
    </ThemeContainer>
  );
};

export default FormLayout;
