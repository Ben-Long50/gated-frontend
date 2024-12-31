import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const SelectField = ({ field, ...props }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);

  const handleBorder = () => {
    if (field.state.meta.errors.length > 0) {
      setBorderColor(errorPrimary);
    } else if (field.state.value) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    handleBorder();
  }, []);

  return (
    <div className={`${props.className}`}>
      <ThemeContainer chamfer="16" borderColor={borderColor}>
        <select
          className={`${props.className} text-secondary timing focus:bg-primary h-[48px] w-full rounded-none ${field.state.value?.length === 0 ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pr-2 pt-3 text-xl outline-none clip-4`}
          name={field.name}
          id={field.name}
          value={field.state.value}
          onFocus={() => {
            handleBorder();
            setFocus(true);
          }}
          onBlur={() => {
            if (field.state.value.length === 0) {
              setBorderColor('transparent');
            }
            setFocus(false);
          }}
          onChange={(e) => {
            field.handleChange(e.target.value);
            handleBorder();
          }}
        >
          {props.children}
        </select>
        <label
          htmlFor={field.name}
          className={` ${field.state.meta.errors.length > 0 ? 'text-error' : ''} ${field.state.value?.length > 0 || focus ? 'bg-primary text-accent -translate-y-6' : ''} ${field.state.value?.length === 0 && !focus ? 'text-gray-400' : ''} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {props.label}
        </label>
      </ThemeContainer>
      {field.state.meta.errors &&
        field.state.meta.errors.map((error: string) => (
          <p
            key={error}
            className="timing text-error mt-1 text-base italic leading-5"
            role="alert"
          >
            {error}
          </p>
        ))}
    </div>
  );
};

export default SelectField;
