import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';

const Divider = ({ className }: { className?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  return (
    <hr
      className={`${className} my-4 w-full border border-opacity-50`}
      style={{ borderColor: accentPrimary }}
    />
  );
};

export default Divider;
